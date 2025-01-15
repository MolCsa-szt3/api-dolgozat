import express from "express"
import { dbAll, dbGet, dbRun } from "../data/database.js"

const router = express.Router()

//GET all
router.get("/", async (req,res)=> {
    try{
        const rows = await dbAll("SELECT * FROM products")
        res.status(200).json(rows)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: err.message})
    }
})

//POST
router.post("/", async (req,res)=> {
    try{
        const {name, brand, description, price} = req.body
        if(!name && !brand && !description && !price){
            return res.status(400).json({message: "Missing Data"})
        }
        const insert = await dbRun("INSERT INTO products (name, brand, description, price) VALUES (?, ?, ?, ?)", [name, brand, description, price])
        res.status(201).json({message: "Successful POST"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: err.message})
    }
})

//GET id
router.get("/:id", async (req,res)=> {
    try{
        const row = await dbAll("SELECT * FROM products WHERE id=?",[req.params.id])
        if (!row){
            res.status(404).json({message: "Data not found!"})
        }
        res.status(200).json(row)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: err.message})
    }
})

//PUT
router.put("/:id", async (req,res)=> {
    try{
        const {name, brand, description, price} = req.body
        if(!name && !brand && !description && !price){
            return res.status(400).json({message: "Missing Data"})
        }
        const row = await dbAll("SELECT * FROM products WHERE id=?",[req.params.id])
        if (!row){
            res.status(404).json({message: "Data not found!"})
        }
        await dbRun("UPDATE products SET name=?, brand=?, description=?, price=? WHERE id=?", [name, brand, description, price, req.params.id])
        res.status(200).json({message: "Successful PUT"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: err.message})
    }
})

//DELETEü
router.delete("/:id", async (req,res)=> {
    try{
        const row = await dbAll("SELECT * FROM products WHERE id=?",[req.params.id])
        if (!row){
            res.status(404).json({message: "Data not found!"})
        }
        await dbRun("DELETE FROM products WHERE id=?", req.params.id)
        res.status(200).json({message: "Successful DELETE"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: err.message})
    }
})




export default router