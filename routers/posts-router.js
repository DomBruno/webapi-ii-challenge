// import Express, Router, and data model
const express = require('express');
const router = express.Router();
const db = require('../data/db.js');

// GET Request Handlers
// Since the server doesn't need to do anything but send us back an object, using then/catch

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
                })
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
// The server needs to create the object, so we use async

        // POST Blog Post
        router.post('/', async (req, res) => {
            const blogPost = {...req.body};

            try {
                const post = await db.insert(blogPost);

                if (!blogPost.title || !blogPost.contents) {
                    res
                    .status(400)
                    .json({message: 'Please provide title and contents for the post.',});
                } else {
                res
                .status(201)
                .json(post);
            } 
                } catch (err) {
                console.log(err);
                res
                .status(500)
                .json({message: 'There was an error while saving the post to the database.',});
            }
            });

        // POST Blog Comemnt
        router.post('/:id/comments', async (req, res) => {
            const commentPost = {...req.body, postId: req.params.id };

            if( !commentPost.text ) {
                return res
                .status(400)
                .json({
                Message: 'Please provide text for the comment.',});
            }

            try {
                const comment = await db.insertComment(commentPost);

                if (!postId) {
                    res
                    .status(404)
                    .json({message: 'The post with the specified ID does not exist.',});
                } else {
                    res
                    .status(201)
                    .json(comment);
                }
            } catch (err) {
                console.log(err);
                res
                .status(500)
                .json({message: 'There was an error while saving the comment to the database.',});
            }
            });

// DELETE Request Handlers
// Using async/await as the server has to take action

        // DELETE a Post by Id
        router.delete('/:id', async (req, res) => {
            const postId = req.params.id;

            try {
                const deletedPost = await db.findById(postId);
                
                if (!postId) {
                    res.status(404)
                    .json({message: 'The post with the specified ID does not exist.',});
                } else {
                    await db.remove(postId);
                    res
                    .status(200)
                    .json(deletedPost);
                }
            } catch (err) {
                console.log(err);
                res
                .status(500)
                .json({message: 'The post could not be removed.',});
            }
        });

// PUT Request Handlers
// Using sync/await as the server has to take action

        // PUT Update Post by Id
        router.put('/:id', async (req, res) => {
            const updatePost = {...req.body, postId: req.params.id };
            if( !updatePost.title || !updatePost.contents ) {
                return res
                .status(400)
                .json({
                Message: 'Please provide title and contents for the post.',});
            }

            try {
                const update = await db.update(updatePost);

                if (!postId) {
                    res
                    .status(404)
                    .json({message: 'The post with the specified ID does not exist.',});
                } else {
                    res
                    .status(201)
                    .json(update);
                }
            } catch (err) {
                console.log(err);
                res
                .status(500)
                .json({message: 'The post information could not be modified.',});
            }
            })
        })
        });


module.exports = router;