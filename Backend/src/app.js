import express from 'express';
import { clerkWebHooks } from './controller/webhooks.js';

const app = express();

app.use(cors());

app.get('/' , "Api Working")
app.post('/clerk' , express.json() , clerkWebHooks)


export default app;