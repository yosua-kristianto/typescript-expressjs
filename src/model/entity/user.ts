import { DataTypes } from 'sequelize';
import { Model, AllowNull, AutoIncrement, Column, NotEmpty, PrimaryKey, Table } from 'sequelize-typescript';

export interface UserItf {
  id?: number | null
  name: string
  email: string
  password: string
}

@Table(
  {
    tableName    : 'users',
    timestamps   : true,
    paranoid     : true,
    underscored  : true
  }
)
export default class User extends Model implements UserItf {
  
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.BIGINT)
  public id?: number | null = 1;

  @AllowNull(false)
  @NotEmpty
  @Column(DataTypes.STRING(60))
  public name: string = "Some Name String";

  @AllowNull(false)
  @NotEmpty
  @Column(DataTypes.STRING(100))
  public email: string = "lala@example.com";

  @AllowNull(false)
  @NotEmpty
  @Column(DataTypes.TEXT)
  public password: string = "*******";

}
