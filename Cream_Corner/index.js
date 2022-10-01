//Name : Abdul Ahad Saleem Shah   Email : ashah6644@conestogac.on.ca
import express from "express"
import cors from "cors"
import MainRouters from "./routers/main.js"
import fs from 'fs'
import mongoose from "mongoose";
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.static('public'))
app.use('/css', express.static(__dirname + "public/css"))
app.use('/images', express.static(__dirname + "public/images"))
app.set('view engine', 'ejs')

app.use(express.json({limit : "30mb", extended : true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

app.use('/', MainRouters)

app.get('/', (req, res) => {
    try {
        res.render('form')
    } catch (error) {
        res.status(404).json( {message : error.message} )
    }
})

mongoose.connect("mongodb+srv://abahad14:Qwerty12@abahaddb.vn7vo.mongodb.net/?retryWrites=true&w=majority", { dbName: 'conestoga22' }, { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(8001, ()=> console.log(`listening on port ${8001}`)))
.catch(err => console.error(err))