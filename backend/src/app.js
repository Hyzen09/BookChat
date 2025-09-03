import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import morgan from 'morgan'
const app = express()

app.use(cors())

// app.use(express.json({limit: "10mb"}))
app.use(express.json())
// app.use(express.urlencoded({extended: true, limit: "10mb"}))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(morgan('dev'))

// routes import

import healthcheckRouter from "./routes/healthcheck.routes.js"
import ingest_bookRouter from "./routes/ingest_book.routes.js"
import chatRouter from "./routes/chat.routes.js"
import testRout from "./routes/test.routes.js"
import suggestQustionRout from "./routes/suggest_questions.routes.js"
//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/ingest_book", ingest_bookRouter)
app.use("/api/v1/chat", chatRouter)
app.use("/api/v1/test",testRout)
app.use("/api/v1/suggest_question",suggestQustionRout)


export {app}

// http://localhost:8000/api/v1/healthcheck