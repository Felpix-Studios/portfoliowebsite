const express = require("express");
const path = require("path");
const app = express();
const fs = require('fs');

var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

let ejs = require('ejs'); 

app.use(express.static('public'))
app.set('view engine', 'ejs');

//Temp Object in place of DB+Schema
articles = [{
    title:"This is my first Article",
    time:new Date('2020-07-13T12:57:30-04:00'),
    markdown:md.render(fs.readFileSync("articles/test.md").toString()),
    wordCount:200 
},{
    title:"This is my second Article",
    time:new Date('2020-07-13T04:53:12.248Z'),
    markdown:md.render(fs.readFileSync("articles/test.md").toString()),
    wordCount:200
}]

articles.sort((a,b)=>b.time-a.time);

articles.forEach(element => {
    console.log(element.time);
    console.log(element.markdown)
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
    res.send(req.params.id);
});
app.get('/about',(req,res)=>{
    res.render('about');
});
const port= process.env.PORT || 5000;


app.listen(port,() => console.log(`Server started on port ${port}`));