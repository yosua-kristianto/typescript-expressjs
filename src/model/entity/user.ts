import { DataTypes } from 'sequelize';
import { Model, AllowNull, AutoIncrement, Column, PrimaryKey, Table } from 'sequelize-typescript';

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
    'user_password',
    'user_is_delete'
  ];
  
  @PrimaryKey
  @AutoIncrement
  @Column(DataTypes.BIGINT)
  id?: number | null;

  @AllowNull(false)
  @Column(DataTypes.STRING(100))
  email!: string;

  @AllowNull(false)
  @Column(DataTypes.STRING(20))
  phone!: string;

  @AllowNull(false)
  @Column(DataTypes.TEXT)
  password?: string | null;

  @AllowNull(true)
  @Column(DataTypes.SMALLINT)
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