import { DataTypes } from 'sequelize';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import MapAdminRole from './MapAdminRole';

@Table({
    tableName  : 'uma_tbl_admin_users',
    timestamps : false,
    paranoid   : false,
    underscored: true
})
class AdminUser extends Model {

    /**
     * @var array
     * hidden
     *  Hide attributes with variable names below
     */
    private hidden: string[] = [
        'password'
    ];

    @Column({
        primaryKey  : true,
        field       : 'admin_id',
        type        : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    })
    admin_id!: string;

    @Column({
        allowNull: false,
        field    : 'email',
        type     : DataTypes.STRING(200)
    })
    email!: string;

    @Column({
        allowNull: false,
        field    : 'password',
        type     : DataTypes.TEXT,
        comment  : 'Always encrypt this.'
    })
    password!: string;

    @Column({
        allowNull    : false,
        field        : 'status',
        type         : DataTypes.SMALLINT,
        defaultValue : 0
    })
    status!: number;

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
    @HasMany(() => MapAdminRole, 'admin_id')
    map_admin_roles!: MapAdminRole[];

}

export default AdminUser;
