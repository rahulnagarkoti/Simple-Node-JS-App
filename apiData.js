const request = require('request');
var blogData="";
module.exports = 
{
    allData: function()
    {
        let url='https://www.healthcare.gov/api/blog.json';
    //api request
    request(url,{json:true},(err,res,body)=>
    {
        if(err)
        {
            console.log("error");
            console.log(err);
        }
         blogData=body.blog;

         blogData.forEach((item)=>
         {
             console.log(item.lang);

         });
    });

    
    },
    filterData: function(lang,topic,date)
    {
        //filter data
    },
    languagesList: function()
    {
        return [{id: "en", lang: "English"},{id: "esp",lang:"Spanish"},{id: "deu", lang:"German"}];
    },
    posts: function()
    {
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
      ];
        return posts; 
    }
};