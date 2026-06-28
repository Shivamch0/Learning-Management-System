import express from 'express';
import dotenv from 'dotenv';
import { clerkWebHooks, stripeWebhooks } from './controller/webhooks.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './config/cloudinary.js';
import cors from 'cors'

dotenv.config();

const app = express();

await connectCloudinary()
const allowedOrigins = [
  'http://localhost:5173',
  'https://lmsfrontend-sandy.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} is not allowed by CORS`));
      }
    },
    credentials: true,
  }),
);
app.use(clerkMiddleware())

app.post('/stripe' , express.raw({type : 'application/json'}) , stripeWebhooks)

app.use(express.json())

import educatorRouter from './routes/educator.route.js';
import courseRouter from './routes/course.route.js';
import userRouter from "./routes/user.route.js"

app.get('/' , (req , res) => res.send("API Working"))
app.post('/clerk' , clerkWebHooks)

app.use('/api/educator' ,  educatorRouter);
app.use('/api/course' , courseRouter);
app.use('/api/user' , userRouter)





export default app;
