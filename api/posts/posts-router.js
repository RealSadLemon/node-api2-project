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
    const body = req.body;
    const { title, contents } = body;
    if(!body.title || !body.contents){
        res.status(400).json({ message: "Please provide title and contents for the post"})
        return;
    } else {
        PostsModel.insert(body)
            .then(createdPost => {
                PostsModel.findById(createdPost.id)
                    .then(post => {
                        if(post){
                            res.status(201).json(post);
                        }
                    })
            })
    }
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    if(!body.title || !body.contents){
        res.status(400).json({ message: "Please provide title and contents for the post"})
        return;
    }
    PostsModel.update(id, req.body)
        .then(postId => {
            PostsModel.findById(postId)
                .then(post => {
                    if(post == null){
                        res.status(404).json({ message: "Does not exist"});
                        return;
                    }
                    res.status(200).json(post);
                })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let postObj;
    PostsModel.findById(id)
        .then(post => {
            postObj = post;
        })
    PostsModel.remove(id)
        .then(post => {
            if(postObj == null){
                res.status(404).json({ message: "Post does not exist" });
                return;
            }
            res.status(200).json(postObj);
        })
})

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
    let postExists;
    PostsModel.findById(id)
        .then(post => {
            postExists = post;
        })
    PostsModel.findPostComments(id)
        .then(comments => {
            if(postExists == null){
                res.status(404).json({ message: "Post does not exist" })
                return;
            }
            res.status(200).json(comments)
        })
})

module.exports = router;