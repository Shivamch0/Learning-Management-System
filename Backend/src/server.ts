import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import { connectDB } from './config/database.js';

const port = process.env.PORT || 5000;

connectDB().catch((error) => {
  console.log('Something went wrong...', error);
});

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log('Server is listening on port on: ', port);
  });
}

export default app;
