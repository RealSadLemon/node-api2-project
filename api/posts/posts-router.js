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
            res.status(200).json(post);
        });
});

router.post('/', (req, res) => {
    PostsModel.insert(req.body)
        .then(createdPost => {
            res.status(201).json(createdPost);
        })
})



module.exports = router;