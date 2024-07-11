const express = require('express');
const app = express();
const videos = require('./routes/videos');
const cors = require('cors');

require('dotenv').config();
const {PORT} = process.env;

//CORS middleware
app.use(cors());

// Middleware to give us access to req.body 
app.use(express.json());

// Middleware to serve up static files
app.use("/public", express.static('./public/images'))

app.get('/', (_req, res) => {
    res.send("request received")
})

app.use('/videos', videos)

app.listen(PORT, () => {
    console.log("I hear you")
})