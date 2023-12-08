import http from "http";
import { port, hostname, databaseConnectionWithRetry } from "./config";

// Middleware function
function logInformation(
  req: http.IncomingMessage,
  _res: http.ServerResponse,
  next: () => void
) {
  console.log(`Request received for ${req.url}`);
  next(); // Proceed with the next middleware or route handler
}

// Create a server instance
const app = http.createServer(
  (_req: http.IncomingMessage, res: http.ServerResponse) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, message: "Hello, world!" }));
  }
);

// Adding middleware to the server
app.on("request", (req: http.IncomingMessage, res: http.ServerResponse) => {
  logInformation(req, res, () => {});
});

// Establish the database connection before starting the server
databaseConnectionWithRetry(3)
  .then(() => {
    // Start listening to the server port after the database connection is established
    app.listen(port, () =>
      console.log(
        `App is running on host http://${hostname} and listening on port ${port}`
      )
    );
  })
  .catch((error) => {
    console.error("Failed to establish database connection:", error);
  });
