import { DataTypes } from 'sequelize';
import { Model, Column, Table, Default } from 'sequelize-typescript';

/**
 * UserInterface
 *
 * @hidable_parameters
 *  password
 *  is_delete
 */
export interface UserItf {
  id?: number | null
  email: string
  phone: string
  password?: string | null
  is_deleted?: number | null
}

@Table(
  {
    tableName    : 'users',
    timestamps   : true,
    paranoid    : true,
    underscored  : true
  }
)
class User extends Model implements UserItf {

  /**
   * @var array
   * hidden
   *  Hide attributes with variable names below
   */
  private hidden = [
    'password',
    'is_deleted'
  ];

  @Column({
    autoIncrement: true,
    primaryKey: true,
    field: "id",
    type: DataTypes.BIGINT
  })
  id?: number | null;

  @Column({
    allowNull: false,
    field: "email",
    type: DataTypes.STRING(255)
  })
  email!: string;

  @Column({
    allowNull: false,
    field: "phone",
    type: DataTypes.STRING(20)
  })
  phone!: string;

  @Column({
    allowNull: false,
    field: "password",
    comment: "Make sure this is encrypted!!!",
    type: DataTypes.TEXT
  })
  password?: string | null;

  @Default(0)
  @Column({
    allowNull: false,
    field: "is_deleted",
    comment: "0: Not Deleted | 1: Deleted",
    type: DataTypes.SMALLINT
  })
  is_deleted?: number | null;

  /**
   * toJSON
   *  Sequelize function settings to cast this model
   *  into JSON
   */
  toJSON () {
    // hide hidden fields
    let attributes = Object.assign({}, this.get())
    for (let a of this.hidden) {
      delete attributes[a]
    }
    return attributes
  }

  /**
   * Virtual Attributes
   */
  @Column({
    type: DataTypes.VIRTUAL(DataTypes.STRING)
  })
  get some_virtual_attributes(): string {
    return `${this.getDataValue('email')} ${this.getDataValue('phone')}`;
  }


}

export default User;