const express = require("express")
const mongoose = require("mongoose")
const expresslayouts = require("express-ejs-layouts");
const dotenv = require("dotenv").config()

const userRouters = require("./routes/user");
const Article = require("./model/article")

mongoose.connect("mongodb://0.0.0.0/Blog")

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(expresslayouts)
app.set("view engine" , 'ejs')

app.use(express.static('public'))
app.use("/article" , userRouters)

app.get("/" , async(req,res)=>{
    const article = await Article.find();
    res.render("index" , {article})
})

const PORT = process.env.PORT || 1080;

app.listen(PORT , ()=>{
    console.log('Working port on 1080');
}) 