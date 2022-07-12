// implement your posts router here
const express = require('express');

const PostsModel = require('./posts-model');

const router = express.Router();

router.get('/', (req, res) => {
    PostsModel.find()
        .then(posts => {
            res.status(200).json(posts)
        })
})

module.exports = router;