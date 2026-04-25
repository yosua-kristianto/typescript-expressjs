param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$CliArgs
)

Push-Location $PSScriptRoot
try {
  & bash ./cuakx.sh @CliArgs
  exit $LASTEXITCODE
}
finally {
  Pop-Location
}
