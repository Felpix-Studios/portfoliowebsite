const express = require("express");
const fs = require('fs');
const slugify = require('slugify');
const path = require("path");
const app = express();



var MarkdownIt = require('markdown-it'),md = new MarkdownIt();

let ejs = require('ejs'); 

app.use('/static', express.static('public'))
app.set('view engine', 'ejs');

//Temp Object in place of DB+Schema
articles = [{
    title:"This is my first Article",
    time:new Date('2020-07-13T12:57:30-04:00'),
    markdown:md.render(fs.readFileSync("articles/test.md").toString()),
    wordCount:fs.readFileSync("articles/test.md").toString().split(' ').length,
    slug:slugify("This is my first Article",{lower:true,strict:true})
}];

articles.sort((a,b)=>b.time-a.time);

articles.forEach(element => {
    console.log(element.time);
    console.log(element.markdown)
    console.log(element.slug)
});
app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/projects',(req,res)=>{
    res.render('projects');
});
app.get('/articles',(req,res)=>{
    res.render('articles',{articles:articles});
});
app.get('/articles/:id',(req,res)=>{
    const article = articles.find(element=>element.slug==req.params.id);
    if(article == null) res.redirect("/articles");
    res.render('article',{article:article})
});
app.get('/about',(req,res)=>{
    res.render('about');
});
const port= process.env.PORT || 5000;


app.listen(port,() => console.log(`Server started on port ${port}`));