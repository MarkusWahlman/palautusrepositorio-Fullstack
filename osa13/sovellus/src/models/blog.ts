import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";
import { User } from "./user";

export class Blog extends Model {
  declare id: number;
  declare author: string | null;
  declare url: string;
  declare title: string;
  declare likes: number;

  declare userId: number;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: [1991],
          msg: "Year must be at least 1991",
        },
        max: {
          args: [new Date().getFullYear()],
          msg: `Year cannot be greater than ${new Date().getFullYear()}`,
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "blogs",
    timestamps: false,
  }
);

User.hasMany(Blog, { foreignKey: "userId" });
Blog.belongsTo(User, { foreignKey: "userId" });
