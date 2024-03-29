const express = require("express");
const fs = require('fs');
const slugify = require('slugify');
const path = require("path");
const app = express();



var MarkdownIt = require('markdown-it'),md = new MarkdownIt();

let ejs = require('ejs'); 

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'))

//Temp Object in place of DB+Schema
// articles = [{
//     title:"The Pilot Article",
//     time:new Date('2020-08-06T23:12:00+00:00'),
//     markdown:md.render(fs.readFileSync("public/articles/The_Pilot_Article.md").toString()),
//     wordCount:fs.readFileSync("public/articles/The_Pilot_Article.md").toString().split(' ').length,
//     slug:slugify("The_Pilot_Article",{lower:true,strict:true})
// }];
// articles.sort((a,b)=>b.time-a.time)
// articles.forEach(element => {
//     console.log(element.wordCount);
// });
app.get('/',(req,res)=>{
    try{
        res.render('index');
    }catch(err){
        res.send('oopse')
    }
});
app.get('/projects',(req,res)=>{
    res.render('projects');
});
app.get('/articles',(req,res)=>{
    res.render('articles',{articles:articles});
});
// app.get('/articles/:id',(req,res)=>{
//     const article = articles.find(element=>element.slug==req.params.id);
//     if(article == null) res.redirect("/articles");
//     res.render('article',{article:article})
// });
app.get('/about',(req,res)=>{
    res.render('about');
});
const port= process.env.PORT || 5000;


app.listen(port,() => console.log(`Server started on port ${port}`));
module.exports=app;