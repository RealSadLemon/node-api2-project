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
        res.status(404).json({ message: "does not exist" })
    })
});

router.post('/', (req, res) => {
    PostsModel.insert(req.body)
    .then(post => {
        if(post){
            res.status(201).json(post);
            return;
        }
        res.status(404).json({ message: "The posts information could not be retrieved" })
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    PostsModel.update(id, req.body)
    .then(post => {
        if(post){
            res.status(200).json(post);
            return;
        }
        res.status(404).json({ message: "The posts information could not be retrieved" })
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    PostsModel.remove(id)
    .then(post => {
        if(post){
            res.status(200).json(post);
            return;
        }
        res.status(404).json({ message: "The posts information could not be retrieved" })
    })
})

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
    PostsModel.findPostComments(id)
    .then(post => {
        if(post){
            res.status(200).json(post);
            return;
        }
        res.status(404).json({ message: "The posts information could not be retrieved" })
    })
})

module.exports = router;