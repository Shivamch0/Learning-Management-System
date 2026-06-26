import express from 'express';
import { clerkWebHooks, stripeWebhooks } from './controller/webhooks.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './config/cloudinary.js';
import cors from 'cors'

const app = express();

await connectCloudinary()
app.use(cors());
app.use(clerkMiddleware())

app.use(express.json())

import educatorRouter from './routes/educator.route.js';
import courseRouter from './routes/course.route.js';
import userRouter from "./routes/user.route.js"

app.get('/' , (req , res) => res.send("API Working"))
app.post('/clerk' , clerkWebHooks)

app.use('/api/educator' ,  educatorRouter);
app.use('/api/course' , courseRouter);
app.use('/api/user' , userRouter)

app.post('/stripe' , express.raw({type : 'application/json'}) , stripeWebhooks)



export default app;