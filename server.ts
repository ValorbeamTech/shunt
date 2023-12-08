// import dependencies 
import http from 'http'
import { port, hostname } from './config'

// define a middleware function
function logInformation(_req: http.IncomingMessage, _res: http.ServerResponse, next: () => void) {
    console.log('Hello, World!');
    next(); // Calling next to proceed with the next middleware or route handler
}


// create a server instance
const app = http.createServer((_req: http.IncomingMessage, res: http.ServerResponse)=>{
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify({"success":true, "message":"Hello, world!"}))

})

// adding middleware to a server
app.on('request', (req: http.IncomingMessage, res: http.ServerResponse)=>{
    logInformation(req, res, ()=>{
    })
})

// listening to a server port
app.listen(port, ()=> console.log(`App is running on host http://${hostname} and listening on port ${port}`))