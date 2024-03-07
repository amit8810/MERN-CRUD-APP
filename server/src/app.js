import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes
import productRoutes from './routes/product.routes.js'

// routes declaration
app.use("/api/v1/products", productRoutes)


app.use('/', (req, res) => {
 res.send("server is listening")
})

export { app }