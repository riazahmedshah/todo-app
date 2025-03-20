import express from "express"
import { authMiddleWare, customReq } from "../middleware";
import { createTodoTypes } from "../types/todoTypes";
import { handleError } from "../utils/handleError";
import { prisma } from "../config/db";

export const todoRouter = express.Router();

todoRouter.post("/add", authMiddleWare, async(req:customReq, res):Promise<void> => {
    const userId = req.token?.userId
    const {success, error} = createTodoTypes.safeParse(req.body);
    if(!success){
        res.status(411).json({ERROR:error});
        return;
    }
    try {
        const todo = await prisma.todo.create({
            data:{
                title:req.body.title,
                description:req.body.description,
                status:req.body.status,
                userId:Number(userId),
            }
        });
        res.status(200).json({todo});
    } catch (error) {
        handleError(error, res);
    }
});

todoRouter.get("/all", authMiddleWare, async(req:customReq, res) => {
    const userId = req.token?.userId
    try {
        const todos = await prisma.todo.findMany({
            where:{
                userId: userId
            },
            include:{
                user:true
            }
        });

        res.status(200).json({todos})
    } catch (error) {
        handleError(error, res)
    }
})