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




export default router