import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";

var dotenv = require('dotenv');
dotenv.config();
var url = process.env.MONGO_URL || "mongodb+srv://prabhatraushan:Ssq8CgcSFya7qBfG@mongodbeah-wq8qy.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const app = express();

app.use(cookieParser());
app.use(cors());

 export default app;