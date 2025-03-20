import express from "express"
import { authMiddleWare, customReq } from "../middleware";

export const todoRouter = express.Router();

todoRouter.post("/", authMiddleWare, async(req:customReq, res) => {
    const token = req.token
    console.log(token);

    res.send(token);
})