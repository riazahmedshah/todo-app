import express from "express"
import dotenv from "dotenv"
import { authRouter } from "./routes/authRouter";
import { todoRouter } from "./routes/todoRouter";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/auth",authRouter);
app.use("/todo", todoRouter);

app.listen(process.env.PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`)
})