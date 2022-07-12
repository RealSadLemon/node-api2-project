// implement your server here
// require your posts router and connect it here
const express = require('express');

const server = express();

server.use('/', (req, res) => res.send('API up and running!'))

module.exports = server;