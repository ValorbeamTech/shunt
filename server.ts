import http from 'http';
import {
  port,
  hostname,
  databaseConnectionWithRetry,
} from './config';
import { routing } from './routes';

// Function to log information
function logInformation(req: http.IncomingMessage) {
  console.log(`Request received for ${req.url}`);
}

// Create a server instance
const app = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  const cleanUrl = req.url?.replace(/^\/+|\/+$/g, '');

  logInformation(req); // Middleware: Log information
  routing(cleanUrl, req, res); // Pass the request to the routing mechanism
});

// Establish the database connection and start the server
databaseConnectionWithRetry(3)
  .then(() => {
    app.listen(port, hostname, () => {
      console.log(`App is running on host http://${hostname} and listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to establish database connection:', error);
  });
