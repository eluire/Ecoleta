import path from "path";

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "060798me",
      database: "next-level",
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds"),
    },
  },

  testing: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "060798me",
      database: "next-level",
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds"),
    },
  },

  production: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "060798me",
      database: "next-level",
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds"),
    },
  },
};
