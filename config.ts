import { MongoClient } from "mongodb"

export const hostname = "localhost"
export const port = 1000;
const mongodbConnectionString = "mongodb://localhost:27017"
const databaseName = "shunt_db"

export async function databaseConnectionWithRetry(number_retry: number) {
  try {
    const client = new MongoClient(mongodbConnectionString);
    await client.connect();
    console.log("Database connected")
    return client.db(databaseName)
  } catch (error) {
    if (number_retry > 0) {
      console.log(
        `Retrying database connection. Retries left: ${number_retry}`
      );
      setTimeout(() => {
        databaseConnectionWithRetry(number_retry - 1); // Retry connection
      }, 3000)
    } else {
      if (error instanceof Error) {
        console.log(`Database error: ${error.message}`)
      } else {
        console.log(`Database error: ${error}`)
      }
    }
  }
}
