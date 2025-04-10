import { Response } from "express";
import zod from "zod"

export function handleError(error: unknown, res: Response){
    if (error instanceof zod.ZodError) {
        console.error(error.message);
        return res.status(400).json({ ZodError: error.message });
        
      }
      
    if(error instanceof Error){
        console.error(error.message);
        return res.status(400).json({ERROR: error.message});
        
    } else{
        return res.status(400).json({ERROR:"Unknown error"})
    }
}