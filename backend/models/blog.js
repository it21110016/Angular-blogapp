// import mongoose
const mongoose = require('mongoose');

// create a schema
const {Schema} = mongoose;

//define the schema
const blogSchema = new Schema({

    name: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
});

// create the module
const Blog = mongoose.model("Blog", blogSchema);

//export the module
module.exports = Blog;