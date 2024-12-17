import { Request,Response } from "express";
import pool from "../../../configs/db/pool";

const getCategoryController = async(req:Request,res:Response) =>{
    try{
        const data =  await pool.query("SELECT category_name FROM Category");
        res.status(200).json({data:data.rows})
    }catch(e){
        res.status(400).json({error: e});
    }
}
const getCategoryIdController = async(req:Request, res:Response) =>{
    const {category_name} = req.params;
    try{
        const data = await pool.query("SELECT category_id FROM Category where category_name = $1", [category_name]);
        res.status(200).json({data:data.rows[0]});
    }catch(e){
        res.status(400).json({error:e});
    }
}
const getCategoryByIdController = async(req:Request, res:Response) =>{
    const {category_id} = req.params;
    try{
        console.log(category_id);
        const data = pool.query("SELECT category_name from category where category_id = $1", [category_id]);
        res.status(200).json((await data).rows);
    }catch(e){
        res.status(500).json(e);
    }
}
const CategoryController = {
    getCategoryController,
    getCategoryIdController,
    getCategoryByIdController
};

export default CategoryController;