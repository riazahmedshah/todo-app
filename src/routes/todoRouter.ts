import express from "express"
import { authMiddleWare, customReq } from "../middleware";
import { createTodoTypes } from "../types/todoTypes";
import { handleError } from "../utils/handleError";
import { prisma } from "../config/db";

export const todoRouter = express.Router();

todoRouter.post("/create", authMiddleWare, async(req:customReq, res):Promise<void> => {
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

todoRouter.patch("/update/:todoId", authMiddleWare, async(req:customReq, res): Promise<void> => {
    const {todoId} = req.params
    const {success, error} = createTodoTypes.safeParse(req.body);
    if(!success){
        res.status(411).json({ERROR:error});
        return;
    }
    try {
        console.log(todoId);
        const todo = await prisma.todo.update({
            where:{
                id:Number(todoId)
            },
            data:{
                title:req.body.title,
                description:req.body.description
            }
        });
        res.status(200).json({MSG:"succesfully updated"});
    } catch (error) {
        handleError(error, res)
    }
});

todoRouter.get("/read", authMiddleWare, async(req:customReq, res) => {
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
        if(todos.length == 0){
            res.status(200).json({MSG:"No todos available"});
            return;
        }

        res.status(200).json({todos})
    } catch (error) {
        handleError(error, res)
    }
});

todoRouter.delete("/delete/:todoId", authMiddleWare, async(req, res) => {
    const {todoId} = req.params
    try {
        await prisma.todo.delete({
            where:{
                id:Number(todoId)
            }
        });
        res.status(200).json({MSG:"deleted successfully"});
    } catch (error) {
        handleError(error,res)
    }
})