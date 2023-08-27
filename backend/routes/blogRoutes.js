// import blog controller to use its methods
const {

    getAllBlogs,
    getBlog,
    addBlog,
    updateBlog,
    deleteBlog

   } = require('../controllers/blogController');

// import express module
const express = require('express');

// create router object
const router = express.Router();


const { requireAuth } = require('../middleware/authmiddle');

// handle GET rquest at root
router.get('/', getAllBlogs);

// handle GET rquest at "/:id" uri
router.get('/:id', requireAuth, getBlog);

// handle POST rquest at root
router.post('/', requireAuth, addBlog);

// handle PUT rquest at "/:id" uri
router.put('/:id', requireAuth, updateBlog);

// handle DELETE rquest at "/:id" uri
router.delete('/:id', requireAuth, deleteBlog);

module.exports = router;