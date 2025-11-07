export async function up({ context: queryInterface }) {
  await queryInterface.addColumn("blogs", "year", {
    type: "INTEGER",
    allowNull: true,
  });
}
export async function down({ context: queryInterface }) {
  await queryInterface.removeColumn("blogs", "year");
}
