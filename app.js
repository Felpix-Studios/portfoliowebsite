const express = require("express");
const path = require("path");
const app = express();

let ejs = require('ejs'); 

app.use(express.static('public'))
app.set('view engine', 'ejs');

//Temp Object in place of DB+Schema
const articles = [{
    title:"This is my first Article",
    time:new Date(),
    markdown:"*Welcome! Hope you have a great day.",
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