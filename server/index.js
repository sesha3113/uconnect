'use strict';

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const chat = require("./routes/chat");
const env = require('dotenv').config().parsed;
const engine = require('express-handlebars').engine;


const port = env.PORT || 3000;
const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", path.resolve(__dirname, "./views"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    console.log("hell");
    res.status(200).render('home');
})

app.use('/chat', chat);


app.listen(port, () => {
    console.log(`listening at port ${port}`);
})