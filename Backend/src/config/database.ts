import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';
import dns from 'dns';

dns.setServers(['1.1.1.1' , '8.8.8.8'])

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
    } catch (error) {
        console.log("Database Connection failed" , error);
        process.exit(1)
    }
}