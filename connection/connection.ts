const { MongoClient, Db } = require("mongodb")

export const port = 1000
export const hostname = "localhost"
export const databaseName = "shunt_db"
const mongodbConnectionString = "mongodb://127.0.0.1:27017"

export let activeDb: typeof Db | null = null
export async function databaseConnectionWithRetry(number_retry: number) {
    try {
        const client = new MongoClient(mongodbConnectionString)
        await client.connect()
        activeDb = client.db(databaseName)
        return client.db(databaseName)

    } catch (error) {
        if (number_retry > 0) {
            return new Promise<typeof Db>((resolve) => {
                setTimeout(async () => {
                    resolve(await databaseConnectionWithRetry(number_retry - 1));
                }, 3000);
            });
        } else {
            if (error instanceof Error) {
                console.log(`Database error: ${error.message}`)
            } else {
                console.log(`Database error: ${error}`)
            }
        }
    }
}

