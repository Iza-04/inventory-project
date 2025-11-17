import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres", // пользователь PostgreSQL
  host: "localhost",
  database: "inventory", // имя базы данных
  password: "password", // пароль
  port: 5432,
});
