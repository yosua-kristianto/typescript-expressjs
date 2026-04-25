#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

BOILERPLATE_SRC="$SCRIPT_DIR/src"
API_ROOT="$BOILERPLATE_SRC/main/api"
SEQUELIZE_ROOT="$BOILERPLATE_SRC/resources/sequelize-cli"
MIGRATION_ROOT="$SEQUELIZE_ROOT/migrations"
SEEDER_ROOT="$SEQUELIZE_ROOT/seeders"
ROUTE_MANAGEMENT_PATH="$BOILERPLATE_SRC/main/routes/RouteManagement.ts"
CRON_BOOTSTRAP_PATH="$BOILERPLATE_SRC/main/bootstrap/CronBootstrap.ts"
MESSAGING_BOOTSTRAP_PATH="$BOILERPLATE_SRC/main/bootstrap/MessagingBootstrap.ts"
CRON_ROOT="$BOILERPLATE_SRC/main/cronjob"
MESSAGING_ROOT="$BOILERPLATE_SRC/main/messaging"
CACHE_REPOSITORY_ROOT="$BOILERPLATE_SRC/main/repository/cache"
REPOSITORY_ROOT="$BOILERPLATE_SRC/main/repository"

fail() {
  echo "[cuakx] $1" >&2
  exit 1
}

print_help() {
  cat <<'EOF'
cuakx CLI

Usage:
  cuakx <command> <action> [name] [options]

Commands:
  migration add <name> [--seeder]
      Generate a migration file, or a seeder file when --seeder is provided.

  migration rollback
      Roll back the last applied migration.

  migration refresh
      Drop database, recreate database, then run all migrations.

  migration seed
      Run all seed files.

  create module <PascalCaseName>
  make module <PascalCaseName>
      Generate a complete API module scaffold:
      - controller
      - controller handler
      - request/response DTO
      - validation
      - exception
      Also auto-registers route in RouteManagement.ts.

  create cronjob <Name>
  make cronjob <Name>
      Generate a BaseCronjob class and auto-register it in CronBootstrap.ts.

  create messaging <Name>
  make messaging <Name>
      Generate messaging producer/consumer class + DTO and auto-register it in MessagingBootstrap.ts.

  create cache <Name>
  make cache <Name>
      Generate a typed cache repository using MemcacheFacade.

  create repository <Name>
  make repository <Name>
      Generate a database repository class skeleton.

Aliases:
  create and make are equivalent for scaffolding commands.

Options:
  -h, --help, help
      Show this help message.

Naming rules:
  - module name must be PascalCase, for example NotificationPlatform.
  - generated topics/keys/folder names use dot.case, for example user.onboarded.
  - generated class names use PascalCase.

Examples:
  cuakx -h
  cuakx help
  cuakx migration add create_users_table
  cuakx migration add seed_roles --seeder
  cuakx migration rollback
  cuakx make module NotificationPlatform
  cuakx make cronjob PaymentRetry
  cuakx make messaging UserOnboarded
  cuakx make cache SessionToken
  cuakx make repository OrderReport
EOF
}

to_timestamp() {
  date +"%Y%m%d%H%M%S"
}

to_kebab_case() {
  local value="$1"
  echo "$value" \
    | sed -E 's/([a-z0-9])([A-Z])/\1-\2/g' \
    | sed -E 's/[^a-zA-Z0-9]+/-/g' \
    | sed -E 's/^-+|-+$//g' \
    | tr '[:upper:]' '[:lower:]'
}

to_dot_case() {
  local value="$1"
  echo "$(to_kebab_case "$value")" | tr '-' '.'
}

is_pascal_case() {
  local value="$1"
  [[ "$value" =~ ^[A-Z][A-Za-z0-9]*$ ]]
}

to_pascal_case() {
  local value="$1"
  local kebab
  kebab="$(to_kebab_case "$value")"
  awk -F'-' '{
    out=""
    for (i = 1; i <= NF; i++) {
      if (length($i) > 0) {
        out = out toupper(substr($i,1,1)) substr($i,2)
      }
    }
    print out
  }' <<< "$kebab"
}

ensure_dir() {
  mkdir -p "$1"
}

write_if_not_exists() {
  local file_path="$1"
  local content="$2"

  if [[ -e "$file_path" ]]; then
    fail "File already exists: $file_path"
  fi

  printf "%s" "$content" > "$file_path"
}

read_text_file() {
  local file_path="$1"

  if [[ ! -f "$file_path" ]]; then
    fail "File does not exist: $file_path"
  fi

  cat "$file_path"
}

write_text_file() {
  local file_path="$1"
  local content="$2"
  printf "%s" "$content" > "$file_path"
}

insert_before_line_once() {
  local file_path="$1"
  local target_line="$2"
  local insert_line="$3"

  local tmp
  tmp="$(mktemp)"

  awk -v target="$target_line" -v insert="$insert_line" '
    BEGIN { inserted = 0 }
    {
      if (!inserted && $0 == target) {
        print insert
        inserted = 1
      }
      print
    }
    END { if (!inserted) exit 1 }
  ' "$file_path" > "$tmp" || {
    rm -f "$tmp"
    return 1
  }

  mv "$tmp" "$file_path"
}

insert_block_before_token_once() {
  local file_path="$1"
  local token="$2"
  local block="$3"

  local tmp
  tmp="$(mktemp)"

  awk -v token="$token" -v block="$block" '
    BEGIN { inserted = 0 }
    {
      if (!inserted && index($0, token) > 0) {
        print block
        inserted = 1
      }
      print
    }
    END { if (!inserted) exit 1 }
  ' "$file_path" > "$tmp" || {
    rm -f "$tmp"
    return 1
  }

  mv "$tmp" "$file_path"
}

run_yarn_script() {
  local script_name="$1"
  yarn "$script_name" || fail "Failed to execute yarn $script_name"
}

create_migration_or_seeder() {
  local name_arg="${1:-new-file}"
  local as_seeder="${2:-false}"

  local safe_name
  safe_name="$(to_kebab_case "$name_arg")"
  local timestamp
  timestamp="$(to_timestamp)"

  local target_root="$MIGRATION_ROOT"
  if [[ "$as_seeder" == "true" ]]; then
    target_root="$SEEDER_ROOT"
  fi

  ensure_dir "$target_root"

  local file_name="${timestamp}-${safe_name}.js"
  local file_path="$target_root/$file_name"

  local template
  if [[ "$as_seeder" == "true" ]]; then
    template=$'\'use strict\';\n\n/** @type {import(\'sequelize-cli\').Migration} */\nmodule.exports = {\n  async up(queryInterface, Sequelize) {\n    // TODO: add seeder logic\n  },\n\n  async down(queryInterface, Sequelize) {\n    // TODO: revert seeder logic\n  }\n};\n'
  else
    template=$'\'use strict\';\n\n/** @type {import(\'sequelize-cli\').Migration} */\nmodule.exports = {\n  async up(queryInterface, Sequelize) {\n    // TODO: add migration logic\n  },\n\n  async down(queryInterface, Sequelize) {\n    // TODO: revert migration logic\n  }\n};\n'
  fi

  write_if_not_exists "$file_path" "$template"
  if [[ "$as_seeder" == "true" ]]; then
    echo "[cuakx] Generated seeder: $file_path"
  else
    echo "[cuakx] Generated migration: $file_path"
  fi
}

auto_register_module_route() {
  local module_class="$1"
  local folder_name="$2"

  local import_line="import ${module_class}Controller from \"../api/${folder_name}/${module_class}Controller\";"
  local register_line="route.use(${module_class}Controller);"
  local config_import_line="import config from '@config/Config';"
  local route_get_token="route.get('/',"

  if ! grep -Fq "$import_line" "$ROUTE_MANAGEMENT_PATH"; then
    insert_before_line_once "$ROUTE_MANAGEMENT_PATH" "$config_import_line" "$import_line" \
      || fail "Unable to locate config import in RouteManagement.ts for auto-registration."
  fi

  if ! grep -Fq "$register_line" "$ROUTE_MANAGEMENT_PATH"; then
    insert_block_before_token_once "$ROUTE_MANAGEMENT_PATH" "$route_get_token" "$register_line" \
      || fail "Unable to locate route registration section in RouteManagement.ts."
  fi
}

auto_register_cronjob_bootstrap() {
  local cronjob_class="$1"
  local import_line="import { ${cronjob_class} } from '../cronjob/${cronjob_class}';"
  local register_line="    new ${cronjob_class}(cronEngine),"
  local import_marker="// cuakx:cronjob:import"
  local register_marker="// cuakx:cronjob:register"

  if ! grep -Fq "$import_line" "$CRON_BOOTSTRAP_PATH"; then
    insert_before_line_once "$CRON_BOOTSTRAP_PATH" "$import_marker" "$import_line" \
      || fail "Unable to locate cronjob import marker in CronBootstrap.ts."
  fi

  if ! grep -Fq "$register_line" "$CRON_BOOTSTRAP_PATH"; then
    insert_before_line_once "$CRON_BOOTSTRAP_PATH" "$register_marker" "$register_line" \
      || fail "Unable to locate cronjob register marker in CronBootstrap.ts."
  fi
}

auto_register_messaging_bootstrap() {
  local messaging_class="$1"
  local folder_name="$2"

  local import_line="import { ${messaging_class} } from '../messaging/${folder_name}/${messaging_class}';"
  local import_marker="// cuakx:messaging:import"
  local register_marker="// cuakx:messaging:register"
  local register_probe="const messaging = new ${messaging_class}();"

  local register_block
  register_block=$(cat <<EOF
    async () => {
      const messaging = new ${messaging_class}();
      await messaging.consume(async (payload) => {
        Log.i('MESSAGING', '${messaging_class} received payload', payload);
      });
    },
EOF
)

  if ! grep -Fq "$import_line" "$MESSAGING_BOOTSTRAP_PATH"; then
    insert_before_line_once "$MESSAGING_BOOTSTRAP_PATH" "$import_marker" "$import_line" \
      || fail "Unable to locate messaging import marker in MessagingBootstrap.ts."
  fi

  if ! grep -Fq "$register_probe" "$MESSAGING_BOOTSTRAP_PATH"; then
    insert_before_line_once "$MESSAGING_BOOTSTRAP_PATH" "$register_marker" "$register_block" \
      || fail "Unable to locate messaging register marker in MessagingBootstrap.ts."
  fi
}

create_module() {
  local module_name="${1:-}"
  if [[ -z "$module_name" ]]; then
    fail "Module name is required. Usage: cuakx create module <name>"
  fi

  if ! is_pascal_case "$module_name"; then
    fail "Module name must use PascalCase. Example: cuakx make module NotificationPlatform"
  fi

  local folder_name
  folder_name="$(to_dot_case "$module_name")"
  local module_class
  module_class="$(to_pascal_case "$module_name")"
  local exception_code_prefix="${module_class^^}"
  exception_code_prefix="${exception_code_prefix:0:3}"

  local module_root="$API_ROOT/$folder_name"
  local dto_request_root="$module_root/dto/request"
  local dto_response_root="$module_root/dto/response"
  local exception_root="$module_root/exception"
  local validation_root="$module_root/validation"

  if [[ -e "$module_root" ]]; then
    fail "Module already exists: $module_root"
  fi

  ensure_dir "$dto_request_root"
  ensure_dir "$dto_response_root"
  ensure_dir "$exception_root"
  ensure_dir "$validation_root"

  write_if_not_exists "$module_root/${module_class}ControllerHandler.ts" "export class ${module_class}ControllerHandler {
  // TODO: implement handler logic
}
"

  write_if_not_exists "$module_root/${module_class}Controller.ts" "import { BaseController, Request } from 'cuakx-express-core/api';
import { BaseResponse } from 'cuakx-express-core/facade/response.util';
import express from 'express';

import { ${module_class}ControllerHandler } from './${module_class}ControllerHandler';

class ${module_class}Controller extends BaseController {
  public routes = (): express.Router => {
    this.get('/${folder_name}', (_dto: Request): BaseResponse => {
      return BaseResponse.ok({ ok: true }, '${module_class} module is running');
    });

    return this.app;
  }
}

export default new ${module_class}Controller().routes();
"

  write_if_not_exists "$dto_request_root/${module_class}RequestDTO.ts" "export interface ${module_class}RequestDTO {
  // TODO: define request dto
}
"

  write_if_not_exists "$dto_response_root/${module_class}ResponseDTO.ts" "export interface ${module_class}ResponseDTO {
  // TODO: define response dto
}
"

  write_if_not_exists "$exception_root/${module_class}Exception.ts" "import { ErrorHandler } from 'cuakx-express-core/config';

export class ${module_class}Exception extends ErrorHandler {
  constructor() {
    super('${exception_code_prefix}0001', '${module_class} exception.');
  }
}
"

  write_if_not_exists "$validation_root/${module_class}Validation.ts" "import { body } from 'express-validator';

export default [
  body('id').optional().isString().withMessage(\"Parameter 'id' must be string.\")
];
"

  echo "[cuakx] Module generated: $module_root"

  auto_register_module_route "$module_class" "$folder_name"
  echo "[cuakx] Module route auto-registered in $ROUTE_MANAGEMENT_PATH"
}

create_cronjob() {
  local name_arg="${1:-}"
  if [[ -z "$name_arg" ]]; then
    fail "Cronjob name is required. Usage: cuakx create cronjob <name>"
  fi

  local class_name
  class_name="$(to_pascal_case "$name_arg")Cronjob"

  ensure_dir "$CRON_ROOT"

  local file_path="$CRON_ROOT/${class_name}.ts"
  write_if_not_exists "$file_path" "import { BaseCronjob } from 'cuakx-express-core/facade/cron';
import { Log } from 'cuakx-express-core/config';

export class ${class_name} extends BaseCronjob {
  /** Returns unique cronjob name. */
  name(): string {
    return '$(to_dot_case "$name_arg")';
  }

  /** Returns cron expression for this cronjob. */
  expression(): string {
    return '* * * * *';
  }

  /** Executes cronjob logic. */
  execute(): void {
    Log.i('CRON', '${class_name} executed');
  }
}
"

  echo "[cuakx] Cronjob generated: $file_path"
  auto_register_cronjob_bootstrap "$class_name"
  echo "[cuakx] Cronjob auto-registered in $CRON_BOOTSTRAP_PATH"
}

create_messaging() {
  local name_arg="${1:-}"
  if [[ -z "$name_arg" ]]; then
    fail "Messaging name is required. Usage: cuakx create messaging <name>"
  fi

  local folder_name
  folder_name="$(to_dot_case "$name_arg")"
  local class_name
  class_name="$(to_pascal_case "$name_arg")Messaging"
  local dto_name
  dto_name="$(to_pascal_case "$name_arg")MessageDTO"

  local target_root="$MESSAGING_ROOT/$folder_name"
  local dto_root="$target_root/dto"

  ensure_dir "$dto_root"

  write_if_not_exists "$dto_root/${dto_name}.ts" "export interface ${dto_name} {
  // TODO: define message payload
}
"

  write_if_not_exists "$target_root/${class_name}.ts" "import { BaseMessaging, Messaging, MessagingConsumeHandler } from 'cuakx-express-core/facade/messaging';

import { ${dto_name} } from './dto/${dto_name}';

export class ${class_name} extends BaseMessaging<${dto_name}> {
  /** Produces payload to a broker topic. */
  async produce(payload: ${dto_name}): Promise<void> {
    await Messaging.produce<${dto_name}>({
      topic: '${folder_name}.topic',
      payload
    }, 'main');
  }

  /** Consumes payload from a broker topic. */
  async consume(handler: MessagingConsumeHandler<${dto_name}>): Promise<void> {
    await Messaging.consume<${dto_name}>({
      topic: '${folder_name}.topic',
      groupId: '${folder_name}.group'
    }, handler, 'main');
  }
}
"

  echo "[cuakx] Messaging boilerplate generated: $target_root"
  auto_register_messaging_bootstrap "$class_name" "$folder_name"
  echo "[cuakx] Messaging auto-registered in $MESSAGING_BOOTSTRAP_PATH"
}

create_cache_repository() {
  local name_arg="${1:-}"
  if [[ -z "$name_arg" ]]; then
    fail "Cache name is required. Usage: cuakx create cache <name>"
  fi

  local class_name
  class_name="$(to_pascal_case "$name_arg")CacheRepository"
  local payload_name
  payload_name="$(to_pascal_case "$name_arg")CachePayload"

  ensure_dir "$CACHE_REPOSITORY_ROOT"

  local file_path="$CACHE_REPOSITORY_ROOT/${class_name}.ts"
  write_if_not_exists "$file_path" "import { MemcacheFacade, MemcacheRepository } from 'cuakx-express-core/facade/memcache';

export interface ${payload_name} {
  // TODO: define cache payload fields
}

export class ${class_name} {
  private readonly repository: MemcacheRepository<${payload_name}>;

  constructor() {
    this.repository = MemcacheFacade.repository<${payload_name}>('$(to_dot_case "$name_arg")', 'main');
  }

  /** Saves payload into cache by key. */
  async save(key: string, payload: ${payload_name}): Promise<void> {
    await this.repository.save(key, payload);
  }

  /** Reads payload from cache by key. */
  async get(key: string): Promise<${payload_name} | null> {
    return await this.repository.get(key);
  }

  /** Deletes payload from cache by key. */
  async delete(key: string): Promise<void> {
    await this.repository.delete(key);
  }
}
"

  echo "[cuakx] Cache repository boilerplate generated: $file_path"
}

create_database_repository() {
  local name_arg="${1:-}"
  if [[ -z "$name_arg" ]]; then
    fail "Repository name is required. Usage: cuakx create repository <name>"
  fi

  local class_name
  class_name="$(to_pascal_case "$name_arg")Repository"

  ensure_dir "$REPOSITORY_ROOT"

  local file_path="$REPOSITORY_ROOT/${class_name}.ts"
  write_if_not_exists "$file_path" "export class ${class_name} {
  /**
   * TODO: inject model/repository dependencies for this module.
   */
  constructor() {}

  /**
   * TODO: implement domain-specific data query methods.
   */
  async findAll(): Promise<unknown[]> {
    return [];
  }
}
"

  echo "[cuakx] Database repository boilerplate generated: $file_path"
}

main() {
  local domain="${1:-}"
  local action="${2:-}"
  shift $(( $# >= 2 ? 2 : $# ))
  local rest=("$@")

  if [[ -z "$domain" || "$domain" == "-h" || "$domain" == "--help" || "$domain" == "help" ]]; then
    print_help
    return 0
  fi

  if [[ "$action" == "-h" || "$action" == "--help" ]]; then
    print_help
    return 0
  fi

  if [[ "$domain" == "migration" ]]; then
    if [[ "$action" == "add" ]]; then
      local has_seeder="false"
      local name_arg=""

      for arg in "${rest[@]}"; do
        if [[ "$arg" == "--seeder" ]]; then
          has_seeder="true"
        elif [[ "$arg" != --* && -z "$name_arg" ]]; then
          name_arg="$arg"
        fi
      done

      create_migration_or_seeder "$name_arg" "$has_seeder"
      return 0
    fi

    if [[ "$action" == "rollback" ]]; then
      run_yarn_script "migrate:rollback"
      return 0
    fi

    if [[ "$action" == "refresh" ]]; then
      run_yarn_script "migrate:refresh"
      return 0
    fi

    if [[ "$action" == "seed" ]]; then
      run_yarn_script "seed"
      return 0
    fi

    fail "Unknown migration action: $action"
  fi

  if [[ "$domain" == "create" || "$domain" == "make" ]]; then
    if [[ "$action" == "module" ]]; then
      create_module "${rest[0]:-}"
      return 0
    fi

    if [[ "$action" == "cronjob" ]]; then
      create_cronjob "${rest[0]:-}"
      return 0
    fi

    if [[ "$action" == "messaging" ]]; then
      create_messaging "${rest[0]:-}"
      return 0
    fi

    if [[ "$action" == "cache" ]]; then
      create_cache_repository "${rest[0]:-}"
      return 0
    fi

    if [[ "$action" == "repository" ]]; then
      create_database_repository "${rest[0]:-}"
      return 0
    fi
  fi

  fail "Unknown command: ${domain} ${action}" 
}

main "$@"