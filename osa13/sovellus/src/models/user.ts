import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db";

export class User extends Model {
  declare id: number;
  declare name: string;
  declare username: string;
  declare disabled: boolean;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name must not be empty" },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Username must not be empty" },
        isEmail: { msg: "Must be a valid email address" },
      },
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);
