export async function up({ context: queryInterface }) {
  await queryInterface.createTable("sessions", {
    token: {
      type: "TEXT",
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: "INTEGER",
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("sessions");
}
