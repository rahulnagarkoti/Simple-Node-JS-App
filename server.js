const express = require('express');
const server = express();
const path = require('path');
const router = express.Router();   

    // fake posts to simulate a database
    const posts = [
        {
          id: 1,
          author: 'John',
          title: 'Templating with EJS',
          body: 'Blog post number 1'
        },
        {
          id: 2,
          author: 'Drake',
          title: 'Express: Starting from the Bottom',
          body: 'Blog post number 2'
        },
        {
          id: 3,
          author: 'Emma',
          title: 'Streams',
          body: 'Blog post number 3'
        },
        {
          id: 4,
          author: 'Cody',
          title: 'Events',
          body: 'Blog post number 4'
        }
      ]
      const languages = [{id: 1, lang: "English"},{id: 2,lang:"Spanish"},{id: 3, lang:"German"}];

//setup view template
server.set('view engine','ejs');

//requests to /
router.get('/',function(req,res){
  res.render('index',{languages: languages,posts: posts});
});


//add the router and start the server
server.use('/', router);
server.listen(process.env.port || 3000);
console.log('Running at Port 3000');