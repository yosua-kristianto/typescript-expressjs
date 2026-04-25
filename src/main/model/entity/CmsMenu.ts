import { DataTypes } from 'sequelize';
import { BelongsTo, Column, HasMany, Model, Table } from 'sequelize-typescript';
import MapRoleMenuAccess from '@model/entity/MapRoleMenuAccess';

@Table({
    tableName  : 'uma_tbl_cms_menu',
    timestamps : false,
    paranoid   : false,
    underscored: true
})
class CmsMenu extends Model {

    /**
     * @var array
     * hidden
     *  Hide attributes with variable names below
     */
    private hidden: string[] = [];

    @Column({
        primaryKey  : true,
        field       : 'cms_menu_id',
        type        : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    })
    cms_menu_id!: string;

    @Column({
        allowNull: false,
        field    : 'name',
        type     : DataTypes.STRING(20)
    })
    name!: string;

    @Column({
        allowNull : true,
        field     : 'parent_menu_id',
        type      : DataTypes.UUID,
        comment   : 'Self-referencing FK. Null if this is a root menu.'
    })
    parent_menu_id?: string | null;

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
    @BelongsTo(() => CmsMenu, 'parent_menu_id')
    parent_menu?: CmsMenu | null;

    @HasMany(() => CmsMenu, 'parent_menu_id')
    child_menus!: CmsMenu[];

    @HasMany(() => MapRoleMenuAccess, 'cms_menu_id')
    map_role_menu_accesses!: MapRoleMenuAccess[];

}

export default CmsMenu;
