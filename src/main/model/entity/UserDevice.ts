import { DataTypes } from 'sequelize';
import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import LovDeviceType from '@model/entity/LovDeviceType';
import MobileUser from '@model/entity/MobileUser';

@Table({
    tableName  : 'uma_tbl_user_devices',
    timestamps : false,
    paranoid   : false,
    underscored: true
})
class UserDevice extends Model {

    /**
     * @var array
     * hidden
     *  Hide attributes with variable names below
     */
    private hidden: string[] = [];

    @Column({
        primaryKey  : true,
        field       : 'device_id',
        type        : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    })
    device_id!: string;

    @Column({
        allowNull : false,
        field     : 'user_id',
        type      : DataTypes.UUID,
        references: {
            model: 'uma_tbl_mobile_users',
            key  : 'user_id'
        }
    })
    user_id!: string;

    @Column({
        allowNull: true,
        field    : 'last_login',
        type     : 'TIMESTAMP'
    })
    last_login?: Date | null;

    @Column({
        allowNull : false,
        field     : 'device_type_id',
        type      : DataTypes.STRING(20),
        references: {
            model: 'uma_tbl_lov_device_type',
            key  : 'device_type_id'
        }
    })
    device_type_id!: string;

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
    @BelongsTo(() => MobileUser, 'user_id')
    mobile_user!: MobileUser;

    @BelongsTo(() => LovDeviceType, 'device_type_id')
    lov_device_type!: LovDeviceType;

}

export default UserDevice;
