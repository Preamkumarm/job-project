import express from 'express'
import "./config/instrument.js";
import cors from 'cors'
import 'dotenv/config'
import * as Sentry from "@sentry/node";
import connectDB from './config/db.js'
import { clerkWebhooks } from './controllers/webhooks.js';
import companyRoutes from "./Routes/companyRoutes.js"
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './Routes/jobRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'

const app = express()


await connectDB()
await connectCloudinary()

Sentry.setupExpressErrorHandler(app);

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

app.get('/',(req,res) => res.send("API Working"));

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
  app.post('/webhooks',clerkWebhooks);
  app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5001

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})