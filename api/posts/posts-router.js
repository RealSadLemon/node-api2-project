// implement your posts router here
const express = require('express');

const PostsModel = require('./posts-model');

const router = express.Router();

router.get('/', (req, res) => {
    PostsModel.find()
        .then(posts => {
            res.status(200).json(posts);
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    PostsModel.findById(id)
    .then(post => {
        if(post){
            res.status(200).json(post);
            return;
        }
        res.status(404).json({ message: "The posts information could not be retrieved" })
    })
});

router.post('/', (req, res) => {
    const body = req.body;
    console.log(body)
    PostsModel.insert(body)
        .then(createdPost => {
            PostsModel.findById(createdPost.id)
                .then(post => {
                    res.status(201).json(post);
                })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    PostsModel.update(id, req.body)
        .then(updatedPost => {
            res.status(200).json(updatedPost);
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    PostsModel.remove(id)
        .then(deletedPost => {
            res.status(200).json(deletedPost);
        })
})

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
    PostsModel.findPostComments(id)
        .then(comments => {
            res.status(200).json(comments)
        })
})

module.exports = router;