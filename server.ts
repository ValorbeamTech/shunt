import http from 'http'
import { port, hostname, databaseConnectionWithRetry } from './config'
import { routing } from './routes'
import { Db } from 'mongodb'

// Function to log information
function logInformation(req: http.IncomingMessage) {
  console.log(`Request received for ${req.url}`)
}

// Create a server instance
const app = http.createServer((req, res) => {
  const cleanUrl = req.url?.replace(/^\/+|\/+$/g, '')
  logInformation(req); // Middleware: Log information
  routing(cleanUrl, req, res) // Pass the request to the routing mechanism
});

// Establish the database connection
function startServer(app: http.Server) {
  app.listen(port, hostname, () => {
    console.log(`App is running on host http://${hostname} and listening on port ${port}`);
  });
}

// Create collection with database instance
function createCollection(db: Db) {
  db.createCollection('users', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['username', 'password'],
        properties: {
          username: {
            bsonType: 'string',
            description: 'must be a string and is required.',
          },
          password: {
            bsonType: 'string',
            description: 'must be a string and is required.',
          },
        },
      },
    },
  })

    db.createCollection('visits', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['check_in', 'check_out'],
          properties: {
            check_in: {
              bsonType: 'string',
              description: 'must be a string and is required.',
            },
            check_out: {
              bsonType: 'string',
              description: 'must be a string and is required.',
            },
          },
        },
      },
  })
}






// Set database connection 
export let db = {} as Db

// Establish the database connection and start the server
databaseConnectionWithRetry(3)
  .then((res) => {
    if (res) {
      db = res
      return createCollection(db)
    }
    throw new Error('Failed to establish database connection.')
  })
  .then(() => {
    startServer(app)
  })
  .catch((error) => {
    console.error('Failed to establish database connection:', error)
  })
