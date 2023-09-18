import cookieParser from "cookie-parser";
import express from 'express'
import {createServer} from 'http'
import cors from 'cors'

// import routes
import authRouter from './routes/auth.routes'
import productRouter from './routes/products.routes'
import { errorHandler } from './middlewares/error.middleware'
import { handle404 } from "./utils/404-handler";


const app = express()

app.use(cors())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

const httpServer = createServer(app)


app.use(cookieParser())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/products", productRouter)



app.use(handle404)

app.use(errorHandler)
export { httpServer }