// blog_index, blog_details, blog_delete, blog_create_get, blog_create_post
const Blog = require('../models/blog');


const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1})
        .then( results => {
            res.render('blogs/index', { title: 'Home', blogs: results });
        })
        .catch( err => {
            res.render('blogs/index', { title: 'Home', blogs: [] });
        })
}
const blog_details = (req, res) => {
    const id = req.params.id;
    console.log(id);
    Blog.findById(id)
        .then( result => {
            res.render('blogs/details', { title:result.title, blog:result })
        })
        .catch( err => console.log(err));
}
const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then( result=> res.json({ redirect:'/blogs' }))
    .catch( err => console.log(err) )
}
const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create New Blog Post' });
}
const blog_create_post = (req, res) => {
    // req.body is of the form { title: 'adslfkj', snippet: 'adlfk', body: 'asldfkj' }
    const blog = Blog(req.body);
    blog.save()
        .then( result => {
            res.redirect('/');
        })
        .catch( err => console.log(err) )
}

module.exports = {
    blog_index, 
    blog_details, 
    blog_delete, 
    blog_create_get, 
    blog_create_post
}