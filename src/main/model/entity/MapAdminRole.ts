import { DataTypes } from 'sequelize';
import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import AdminUser from './AdminUser';
import Role from './Role';

@Table({
    tableName  : 'uma_tbl_map_admin_role',
    timestamps : false,
    paranoid   : false,
    underscored: true
})
class MapAdminRole extends Model {

    /**
     * @var array
     * hidden
     *  Hide attributes with variable names below
     */
    private hidden: string[] = [];

    @Column({
        primaryKey  : true,
        field       : 'id',
        type        : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    })
    id!: string;

    @Column({
        allowNull : false,
        field     : 'admin_id',
        type      : DataTypes.UUID,
        references: {
            model: 'uma_tbl_admin_users',
            key  : 'admin_id'
        }
    })
    admin_id!: string;

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
    @BelongsTo(() => AdminUser, 'admin_id')
    admin_user!: AdminUser;

    @BelongsTo(() => Role, 'role_id')
    role!: Role;

}

export default MapAdminRole;
