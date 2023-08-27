// import blog model
const Blog = require('../models/blog');

//method to get all existing blogs
const getAllBlogs = async (req, res) => {

    try {

        // Get all existing documents from blogs collection
        const blogs = await Blog.find();

        if (blogs) {

            // Respond with status code 200 (OK) if sucessful
            res.status(200).send(blogs);

        }
        else {

            // Repond with status code 400 (Bad Request) if unsucessful
            res.status(400).send("failed to get blogs")
        }

    } catch (error) {
        // print error message
        console.log(error.message);
    }

};

//method to get a specific blog
const getBlog = async (req, res) => {
    try {

        // Find the particular document
        const blog = await Blog.findOne({ _id: req.params.id })

        if (blog) {

            // Respond with status code 200 (OK) if sucessful
            res.status(200).send(blog);

        }
        else {

            // Repond with status code 400 (Bad Request) if unsucessful
            res.status(400).send("failed to find the blog")
        }
    } catch (error) {
        // print error message
        console.log(error);
    }
}

// method to add a new blog
const addBlog = async (req, res) => {

    // Create new document
    const blog = new Blog({

        name: req.body.name,
        author: req.body.author,
        description: req.body.description

    })
    try {

        // Insert the new document
        await blog.save();

        // Respond with status code 200 (OK) if sucessful
        res.status(200).send("blog added successfully");

    } catch (error) {

        // Repond with status code 400 (Bad Request) if unsucessful
        res.status(400).send("failed to add the blog")

        // print error message
        console.log(error);
    }
}

// method to update an existing blog
const updateBlog = async(req, res) => {
    try {

        // Update the particular document with the new data
        await Blog.findOneAndUpdate({
            _id: req.params.id
        },
        {
            $set: {
                name: req.body.name,
                author: req.body.author,
                description: req.body.description
            }
        })
        
        // Respond with status code 200 (OK) if sucessful
        res.status(200).send("blog updated successfully");

    } catch (error) {

        // Repond with status code 400 (Bad Request) if unsucessful
        res.status(400).send("failed to update the blog");

        // Print the error message
        console.log(error);
    }
}

// method to delete an existing blog
const deleteBlog = async(req, res) => {
    try {

        // Find the particular document and delete it
        await Blog.findOneAndDelete({_id: req.params.id});

        // Respond with status code 200 (OK) if sucessful
        res.status(200).send("blog deleted successfully");
        
    } catch (error) {

        // Repond with status code 400 (Bad Request) if unsucessful
        res.status(400).send("failed to delete the blog");

        console.log(error);
    }
}

//exprt module
module.exports = {
    getAllBlogs,
    getBlog,
    addBlog,
    updateBlog,
    deleteBlog
};