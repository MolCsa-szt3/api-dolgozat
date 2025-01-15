import express from "express";
import cors from "cors";
import { initializeDb } from "./data/database.js"
import productsRouter from "./routes/products.js"
const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/", productsRouter)

try {
    await initializeDb()
    app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)})

} catch (error) {
    console.log(error)
}