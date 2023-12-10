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
  db.command({
    collMod:"users",
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['username', 'password', 'createdBy', 'updatedBy'],
        properties: {
          username: {
            bsonType: 'string',
            description: 'must be a string and is required.',
          },
          password: {
            bsonType: 'string',
            description: 'must be a string and is required.',
          },
          createdBy: {
              bsonType: 'string',
              description: 'must be a string and is required.',
            },
          updatedBy: {
              bsonType: 'string',
              description: 'must be a string and is required.',
            },
        },
      },
    },
    validationAction:"error",
    validationLevel: "strict",
  })

    db.command({
      collMod: "visits",
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['check_in', 'check_out', 'createdBy', 'updatedBy'],
          properties: {
            check_in: {
              bsonType: 'string',
              description: 'must be a string and is required.',
            },
            check_out: {
              bsonType: 'string',
              description: 'must be a string and is required.',
            },
            createdBy: {
              bsonType: 'string',
              description: 'must be a string and is required.',
            },
            updatedBy: {
              bsonType: 'string',
              description: 'must be a string and is required.',
            },
            createdAt: {
              bsonType: 'date',
              description: 'must be a string and is required.',
            },
            updatedAt: {
              bsonType: 'date',
              description: 'must be a string and is required.',
            },
            deletedAt: {
              bsonType: 'date',
              description: 'must be a string and is required.',
            },
          },
        },
      },
      validationAction:"error",
      validationLevel: "strict",
  })
  db.collection('users').createIndex({ username: 1}, {unique: true, name: 'username'})
  db.collection('users').createIndex({ email: 1}, {unique: true, name: 'email'})
  db.collection('users').createIndex({ createdAt: 1})
  db.collection('users').createIndex({ updatedAt: 1})
  db.collection('users').createIndex({ deletedAt: 1})
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
