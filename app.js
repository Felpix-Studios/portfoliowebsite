const express = require("express");
const path = require("path");
const app = express();
const fs = require('fs');

var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

var result = md.render(fs.readFileSync("articles/test.md").toString());
console.log(result);
let ejs = require('ejs'); 

app.use(express.static('public'))
app.set('view engine', 'ejs');

//Temp Object in place of DB+Schema
const articles = [{
    title:"This is my first Article",
    time:new Date(),
    markdown:md.render(fs.readFileSync("articles/test.md").toString()),
    wordCount:200 
}]


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
    res.send(req.params.id);
});
app.get('/about',(req,res)=>{
    res.render('about');
});
const port= process.env.PORT || 5000;


app.listen(port,() => console.log(`Server started on port ${port}`));