import express from 'express';
import { clerkWebHooks } from './controller/webhooks.js';
import cors from 'cors'

const app = express();

app.use(cors());
app.use(clerkMiddleware())

app.use(express.json())

app.get('/' , (req , res) => res.send("API Working"))
app.post('/clerk' , clerkWebHooks)

import educatorRouter from './routes/educator.route.js'
import { clerkMiddleware } from '@clerk/express';

app.use('/api/educator' ,  educatorRouter)


export default app;