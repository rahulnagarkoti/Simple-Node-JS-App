const express = require('express');
const router = express.Router();   
const apiData = require("../apiData");
const fetch = require('node-fetch');
var blogData;
var languageList;

//requests to /
router.get('/', async function(req,res){
  let url='https://www.healthcare.gov/api/blog.json';
  const apiResponse = await fetch(url);
  const json = await apiResponse.json()
  const data= json.blog;
  blogData=data;
  languageList=apiData.languagesList(data);
  var postsList=apiData.posts(data);
  res.render('index',{languages:  languageList, posts: postsList, previousTopic: "", previousDate:"",previousLang:"all"});
  });
  

  //requests to /getData
router.post('/getData',function(req,res,next){
  var postsList=apiData.posts(blogData);
  var lang="";
  var topic="";
  var date= "";
  var result = postsList;
  if(typeof req.body != 'undefined')
  {
    lang= req.body.language;
    topic= req.body.topic;
    date= req.body.date;
    
    if(lang != "" && lang != "all")
    {
      result =postsList.filter(function(post)
      {
        return post?.lang === lang;
      });
    }
    if(topic != "")
    {
      result =result.filter(function(post)
      {
        return post.title?.toLowerCase().includes(topic.toLowerCase());
      });
    }
    var checkDate= new Date(date).getTime();

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
    res.render('index',{languages:  languageList, posts: result, previousTopic: topic, previousDate:date,previousLang:lang});
  });

module.exports = router;