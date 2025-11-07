export async function up({ context: queryInterface }) {
  await queryInterface.createTable("users", {
    id: {
      type: "INTEGER",
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: "VARCHAR(255)",
      allowNull: false,
    },
    username: {
      type: "VARCHAR(255)",
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: "TIMESTAMP",
      allowNull: false,
      defaultValue: queryInterface.sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: "TIMESTAMP",
      allowNull: false,
      defaultValue: queryInterface.sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  await queryInterface.createTable("blogs", {
    id: {
      type: "INTEGER",
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: "VARCHAR(255)",
      allowNull: true,
    },
    url: {
      type: "VARCHAR(255)",
      allowNull: false,
    },
    title: {
      type: "VARCHAR(255)",
      allowNull: false,
    },
    likes: {
      type: "INTEGER",
      allowNull: false,
      defaultValue: 0,
    },
    userId: {
      type: "INTEGER",
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    createdAt: {
      type: "TIMESTAMP",
      allowNull: false,
      defaultValue: queryInterface.sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: "TIMESTAMP",
      allowNull: false,
      defaultValue: queryInterface.sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
}
export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("blogs");
  await queryInterface.dropTable("users");
}
