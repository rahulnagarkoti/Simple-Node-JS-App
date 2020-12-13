const express = require('express');
const router = express.Router();   
const apiData = require("../apiData");
const fetch = require('node-fetch');
//global variables
var blogData;
var languageList;


//requests to /
router.get('/', async function(req,res){
  try
  {
    //api request -> incase of any errors , catch block will deal with it
    const apiResponse = await fetch('https://www.healthcare.gov/api/blog.json').then(res => res.json());
    //wait for the json response
    //const json = await apiResponse.json()
    blogData= apiResponse.blog;
    //storing the data in a global variable
    //get the language list array for dropdown
    languageList=apiData.languagesList(blogData);
    //get the posts to be displayed 
    var postsList=apiData.posts(blogData);
    res.render('index',{languages:  languageList, posts: postsList, previousTopic: "", previousDate:"",previousLang:"all"});
  }
  catch(error)
  {
    console.log(error);
    res.render('error');
  }
  
  });

  //requests to /getData
router.post('/getData',function(req,res,next){
  //default values
  var lang="all";
  var topic="";
  var date= "";
  try
  {
    var postsList=apiData.posts(blogData);
    var result = postsList;
    if(typeof req.body != 'undefined')
    {
      //value entered in the from
      lang= req.body.language;
      topic= req.body.topic;
      date= req.body.date;
      
      //dont filter language if its default
      if(lang != "" && lang != "all")
      {
        result =postsList.filter(function(post)
        {
          return post?.lang === lang;
        });
      }
      //dont topic lang if its default
      if(topic != "")
      {
        //filtering
        result =result.filter(function(post)
        {
          return post.title?.toLowerCase().includes(topic.toLowerCase());
        });
      }
      var checkDate= new Date(date).getTime();
      //dont filter date if its invalid
      if(date != null && !isNaN(checkDate))
      {
        result =result.filter(function(post)
        {
          var tempDate= new Date(post.date).getTime();
          console.log(tempDate);
  
          return tempDate === checkDate;
        });
      }
  
    }  
    console.log(lang);
    res.render('index',{languages:  languageList, posts: result, previousTopic: topic, previousDate:date,previousLang:lang});
  
  }
  catch(error)
  {
    console.log(error);
    res.render('error');
  }  
});

module.exports = router;