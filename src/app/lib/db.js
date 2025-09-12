import mysql from "mysql2/promise";

export async function connectDB() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Welcome@12345",
    database: "placementsuccess"
  });
}
