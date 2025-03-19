import express from "express"
import dotenv from "dotenv"
import { authRouter } from "./routes/authRouter";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/auth",authRouter);

app.listen(process.env.PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`)
})