const express = require('express');
const router = express.Router();   
const apiData = require("../apiData")

//requests to /
router.get('/',function(req,res){
    console.log(apiData.allData());
    res.render('index',{languages:  apiData.languagesList(), posts: apiData.posts()});
  });
  
  //requests to /getData
router.post('/getData',function(req,res,next){
    var lang= req.body.language;
    var topic= req.body.topic;
    var date= req.body.date;
    console.log(lang,topic,date)
    res.render('index',{languages: apiData.languagesList(),posts: apiData.posts()});
});

module.exports = router;