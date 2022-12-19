import {DataTypes} from 'sequelize';
import {Column, Model, Table} from 'sequelize-typescript';

@Table({
    tableName    : '[dbo].[Customer]',
    timestamps   : false,
    paranoid    : false,
    underscored  : true
})
class Customer extends Model {

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
    field: "Id",
    type: DataTypes.BIGINT
  })
  id?: number | null;

  @Column({
    allowNull: false,
    field: "FirstName",
    type: DataTypes.STRING(40)
  })
  first_name!: string;

  @Column({
    allowNull: false,
    field: "LastName",
    type: DataTypes.STRING(40)
  })
  last_name!: string;

  @Column({
    allowNull: false,
    field: "City",
    type: DataTypes.STRING(40)
  })
  city!: string;

  @Column({
    allowNull: false,
    field: "Country",
    type: DataTypes.STRING(40)
  })
  country!: string;

  @Column({
    allowNull: false,
    field: "Phone",
    type: DataTypes.STRING(20)
  })
  phone!: string;

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
    return `${this.getDataValue('first_name')} ${this.getDataValue('last_name')}`;
  }


}

export default Customer;