import express from 'express'
import "./config/instrument.js";
import cors from 'cors'
import 'dotenv/config'
import * as Sentry from "@sentry/node";
import connectDB from './config/db.js'
import { clerkWebhooks } from './controllers/webhooks.js';

const app = express()


await connectDB()
Sentry.setupExpressErrorHandler(app);

app.use(cors())
app.use(express.json())

app.get('/',(req,res) => res.send("API Working"));

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
  app.post('/webhooks',clerkWebhooks);
const PORT = process.env.PORT || 5001

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})