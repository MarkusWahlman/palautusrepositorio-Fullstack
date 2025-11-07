import { Umzug, SequelizeStorage } from "umzug";

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  logging: false,
});

const migrator = new Umzug({
  migrations: {
    glob: "migrations/*.js",
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  logger: console,
});

export const runMigrations = async () => {
  const migrations = await migrator.up();
  console.log("MIGRATIONS: ", migrations);
  console.log(
    "Migrations up to date:",
    migrations.map((m) => m.name)
  );
};

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
