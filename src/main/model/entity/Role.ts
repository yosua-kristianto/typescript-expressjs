import { DataTypes } from 'sequelize';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import MapAdminRole from './MapAdminRole';
import MapRoleMenuAccess from './MapRoleMenuAccess';

@Table({
    tableName  : 'uma_tbl_roles',
    timestamps : false,
    paranoid   : false,
    underscored: true
})
class Role extends Model {

    /**
     * @var array
     * hidden
     *  Hide attributes with variable names below
     */
    private hidden: string[] = [];

    @Column({
        primaryKey  : true,
        field       : 'role_id',
        type        : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    })
    role_id!: string;

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
    @HasMany(() => MapAdminRole, 'role_id')
    map_admin_roles!: MapAdminRole[];

    @HasMany(() => MapRoleMenuAccess, 'role_id')
    map_role_menu_accesses!: MapRoleMenuAccess[];

}

export default Role;
