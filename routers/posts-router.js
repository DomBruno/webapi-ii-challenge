// import Express, Router, and data model
const express = require('express');
const router = express.Router();
const db = require('../data/db.js');

// GET Request Handlers

        // GET all posts
        router.get('/', (req, res) => {
            db.find(req.query)
                .then(posts => {
                    res
                    .status(200)
                    .json(posts);
                })
                .catch(error => {
                    // log error to database
                    console.log(error);
                    res
                    .status(500)
                    .json({
                        message: 'The posts information could not be retrieved.',
                    });
                });

        // GET post by Id
        router.get('/:id', (req, res) => {
            db.findById(req.params.id)
            .then(post => {
                if (!post) {
                    res
                    .status(404)
                    .json({
                        message: 'The post with the specified ID does not exist.',
                    });}
                    else {
                        res
                        .status(200)
                        .json(post);
                    }
                })
                .catch(error => {
                    // log error to database
                    console.log(error);
                    res
                    .status(500)
                    .json({
                        message: 'The post information could not be retrieved.',
                    });
        });

        // GET comment by postId
        router.get('/:id/comments', (req, res) => {
            db.findCommentById(req.params.id)
            .then(comment => {
                if (!comment) {
                    res
                    .status(404)
                    .json({
                        message: 'The post with the specified ID does not exist.',
                    });}
                    else {
                        res
                        .status(200)
                        .json(comment);
                    }
                })
                .catch(error => {
                    // log error to database
                    console.log(error);
                    res
                    .status(500)
                    .json({
                        message: 'The comments information could not be retrieved.',
                    });
            });

// POST Request Handlers

// POST Blog Post
})

});