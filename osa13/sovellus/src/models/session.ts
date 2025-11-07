import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db";
import { User } from "./user";

export class Session extends Model {
  declare token: string;
  declare userId: number;
}

Session.init(
  {
    token: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "sessions",
    timestamps: false,
  }
);

User.hasMany(Session, { foreignKey: "userId" });
Session.belongsTo(User, { foreignKey: "userId" });
