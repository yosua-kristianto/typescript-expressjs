import { DataTypes } from 'sequelize';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import UserDevice from '@model/entity/UserDevice';

@Table({
    tableName  : 'uma_tbl_mobile_users',
    timestamps : false,
    paranoid   : false,
    underscored: true
})
class MobileUser extends Model {

    /**
     * @var array
     * hidden
     *  Hide attributes with variable names below
     */
    private hidden: string[] = [];

    @Column({
        primaryKey  : true,
        field       : 'user_id',
        type        : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    })
    user_id!: string;

    @Column({
        allowNull: false,
        field    : 'email',
        type     : DataTypes.STRING(200)
    })
    email!: string;

    @Column({
        allowNull: false,
        field    : 'name',
        type     : DataTypes.STRING(200)
    })
    name!: string;

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
    @HasMany(() => UserDevice, 'user_id')
    user_devices!: UserDevice[];

}

export default MobileUser;
