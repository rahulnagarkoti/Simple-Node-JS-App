const express = require('express');
const router = express.Router();   
const apiData = require("../apiData");
const fetch = require('node-fetch');


//requests to /
router.get('/', async function(req,res){
  let url='https://www.healthcare.gov/api/blog.json';
  const apiResponse = await fetch(url);
  const json = await apiResponse.json()
  const data= json.blog;
  var languageList=apiData.languagesList(data);
  var postsList=apiData.posts(data);
 

  res.render('index',{languages:  languageList, posts: postsList});

  //  apiData.allData().then((data)=>
  //   {
  //     console.log(data);
  //     //languageList= apiData.languagesList(data);

  //     res.render('index',{languages:  [{id: 1, lang: "English"},{id: 2,lang:"Spanish"},{id: 3, lang:"German"}], posts: apiData.posts()});
  //   });
  });
  

  //requests to /getData
router.post('/getData',function(req,res,next){
    var lang= req.body.language;
    var topic= req.body.topic;
    var date= req.body.date;
    console.log(lang,topic,date)
    res.render('index',{languages: languages,posts: posts});
});

module.exports = router;