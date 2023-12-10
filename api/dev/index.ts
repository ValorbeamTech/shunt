// dependencies
import express, { Application, ErrorRequestHandler, NextFunction, Request, Response } from "express"
import createHttpError from "http-errors"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
import mongoose from "mongoose"

// files import
import router from "./routes"
import { PORT, DB_CONNECTION } from "./config"

// create application
const app: Application = express()

// security middlewares
const limiter = rateLimit({
    windowMs: 60*1000,
    max: 50,
    message: "Too many requests made from your IP, please try again after a minute"
})

app.disable('x-powered-by')
app.use(morgan("common"))
app.use(helmet())
app.use(cors())
app.use(limiter)
app.use(express.json())

// application routing
app.get("/", async (_req: Request, res: Response)=>{
    return (await res.json({message:"it works!"}))
})

app.use('/api', router)

// global error handler
app.use(()=>{
    throw createHttpError(404, "Route not found")
})

const errorHandler: ErrorRequestHandler = (error, _req: Request, res: Response, next: NextFunction) =>{
    console.log(error.message, error.statusCode)
    if(res.headersSent){
        return next(error)
    }
    return res.status(error.statusCode || 500).json({message: error.message})
}

app.use(errorHandler)

// database connection and starting application
mongoose.connect(DB_CONNECTION).then(()=>{
    console.log("Database is connected!")
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
}).catch(()=>{
    throw createHttpError(501, "Unable to connect to the database...")
})

