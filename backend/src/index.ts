import express, { Request, Response } from 'express'
import authRoutes from "./routes/auth.routes.js"
import contentRoutes from "./routes/content.routes.js"
import cors from "cors";
import "dotenv/config"

const port = process.env.PORT || 8000;
const app = express()

app.use(express.json());
app.use(cors())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/content', contentRoutes)


app.listen(port, () => console.log(`Server started at ${port}`))



