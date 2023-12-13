const express = require("express")
const Article = require("../model/article")

const Router = express.Router();


Router.get("/new" , (req,res)=>{
    res.render('article/new')
});

Router.post("/" , (req,res)=>{
    const article  = new Article({
        title : req.body.title,
        des : req.body.des,
        info : req.body.info,
    })
    article.save().then(()=>{
        res.redirect('/')
    })
})


Router.get("/:slug" , async(req,res)=>{
    const article = await Article.findOne({slug : req.params.slug})
    if(article === null){res.redirect('/')}
    res.render('article/show' , {article})
})

//delete

Router.get('/delete/:id' , async(req,res)=>{
    await Article.findByIdAndDelete({_id : req.params.id}).then(()=>{
        res.redirect('/')
    }).catch(()=>{
        res.send("Error ocurred")
    })

    
})


Router.get("/edit/:id" , async (req,res)=>{
    const article_data  = await Article.findById({_id : req.params.id})
    res.render('article/edit' , {article_data})
})

Router.post("/edit/:id" , async (req,res)=>{
    await Article.findByIdAndUpdate({_id : req.params.id} , req.body , {new:true}).then(()=>{
        res.redirect('/')
    }).catch(()=>{
        res.send("Update not occurred!")
    })
})
module.exports = Router;