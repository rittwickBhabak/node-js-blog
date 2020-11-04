const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogRouter');

const app = express();

const dbURI = 'mongodb+srv://rittwick:Abcd1234@nodetuts.3g4hc.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((resulet)=> app.listen(3030))
    .catch(err=>console.log('some error occoured'))

app.set('view engine', 'ejs');

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
   res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})

app.use('/blogs', blogRouter)

app.use((req, res)=>{
    res.status(404).render('404', { title: '404 - Page Not Found' });
})