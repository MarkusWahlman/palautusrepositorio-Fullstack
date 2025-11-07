export async function up({ context: queryInterface }) {
  await queryInterface.createTable("readingList", {
    id: {
      type: "SERIAL",
      primaryKey: true,
    },
    userId: {
      type: "INTEGER",
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    blogId: {
      type: "INTEGER",
      allowNull: false,
      references: { model: "blogs", key: "id" },
      onDelete: "CASCADE",
    },
    read: {
      type: "BOOLEAN",
      allowNull: false,
      defaultValue: false,
    },
  });
}
export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("readingList");
}
