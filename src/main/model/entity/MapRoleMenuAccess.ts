import { DataTypes } from 'sequelize';
import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import CmsMenu from './CmsMenu';
import Role from './Role';

@Table({
    tableName  : 'uma_tbl_map_role_menu_access',
    timestamps : false,
    paranoid   : false,
    underscored: true
})
class MapRoleMenuAccess extends Model {

    /**
     * @var array
     * hidden
     *  Hide attributes with variable names below
     */
    private hidden: string[] = [];

    @Column({
        primaryKey  : true,
        field       : 'role_access_id',
        type        : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    })
    role_access_id!: string;

    @Column({
        allowNull : false,
        field     : 'role_id',
        type      : DataTypes.UUID,
        references: {
            model: 'uma_tbl_roles',
            key  : 'role_id'
        }
    })
    role_id!: string;

    @Column({
        allowNull : false,
        field     : 'cms_menu_id',
        type      : DataTypes.UUID,
        references: {
            model: 'uma_tbl_cms_menu',
            key  : 'cms_menu_id'
        }
    })
    cms_menu_id!: string;

    @Column({
        allowNull: false,
        field    : 'name',
        type     : DataTypes.STRING(20)
    })
    name!: string;

    @Column({
        allowNull    : false,
        field        : 'created_at',
        type         : 'TIMESTAMP',
        defaultValue : DataTypes.NOW
    })
    created_at!: Date;

    @Column({
        allowNull: true,
        field    : 'updated_at',
        type     : 'TIMESTAMP'
    })
    updated_at?: Date | null;

    @Column({
        allowNull: true,
        field    : 'deleted_at',
        type     : 'TIMESTAMP'
    })
    deleted_at?: Date | null;

    /**
     * toJSON
     *  Sequelize function settings to cast this model
     *  into JSON
     */
    toJSON() {
        const attributes = Object.assign({}, this.get());
        for (const a of this.hidden) {
            delete attributes[a];
        }
        return attributes;
    }

    /**
     * Associations
     */
    @BelongsTo(() => Role, 'role_id')
    role!: Role;

    @BelongsTo(() => CmsMenu, 'cms_menu_id')
    cms_menu!: CmsMenu;

}

export default MapRoleMenuAccess;
