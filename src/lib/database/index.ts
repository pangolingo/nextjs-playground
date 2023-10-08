import postgres from "postgres";

const { DB_CONNECTION_STRING } = process.env;

if (!DB_CONNECTION_STRING) {
  throw new Error("Unable to load ENV variable");
}

const sql = postgres(DB_CONNECTION_STRING);

export default sql;
