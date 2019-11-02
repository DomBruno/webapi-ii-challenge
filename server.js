// import express middleware
const express = require('express');

// import "Posts" Router
const postsRouter = require('./routers/posts-router.js');

// create server object
const server = express();

// add JSON parser globally
// if we wanted limited use, we would use router.use() in the specific router file
server.use(express.json());

// Bind to root URLs
server.use('/api/posts', postsRouter);

// Call handler for root "/"
server.get('/', (req, res) => {
    res.status(418)
    res.send("I'm a teapot!");
});

module.exports = server;
