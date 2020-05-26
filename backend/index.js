const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = new express();
const { config, engine } = require("express-edge");

const port = 4000;

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set("views", `../frontend`);

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

/* 
 *   Permite input a JS
 *   req.body.*** 
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, "public")));

app.get('/', async (req, res) => {
    res.render('home');
});

app.get('/search', async(req, res)=>{
    res.render('search')
});

app.get('/sorting', async (req, res) => {
    res.render('sorting')
});

app.get('/unstable', async (req, res) => {
    res.render('unstable')
});

app.get('/stable', async (req, res) => {
    res.render('stable')
});

app.listen(port, () => {
    console.log('App is running in port '+port)
});