import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";
import { User } from "./user";
import { Blog } from "./blog";

export class ReadingList extends Model {
  declare id: number;
  declare userId: number;
  declare blogId: number;
  declare read: boolean;
}

ReadingList.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "readingList",
    timestamps: false,
  }
);

ReadingList.belongsTo(Blog, { foreignKey: "blogId", as: "blog" });
User.hasMany(ReadingList, { foreignKey: "userId", as: "readings" });
