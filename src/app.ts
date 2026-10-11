import cookieParser from "cookie-parser";
import type { Application, Request, Response } from "express";
import express from "express";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.get("/", (req:Request, res: Response) => {
  res.send("Hello, world");
});

export default app;
