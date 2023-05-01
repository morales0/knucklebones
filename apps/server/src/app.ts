import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

export default app;
