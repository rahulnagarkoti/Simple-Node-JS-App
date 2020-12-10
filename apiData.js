const fetch = require('node-fetch');

module.exports = 
{
    allData: async function()
    {
        var data;
        let url='https://www.healthcare.gov/api/blog.json';
        const apiResponse = await fetch(url);
        const json = await apiResponse.json()
        console.log(json.blog);
        return json.blog;

    },
    filterData: function(lang,topic,date)
    {
        resarray=[];
        //filter data
        console.log(this.allData());
        this.allData().forEach(element => {
            if(element.lang.Contains(lang))
            {
                resarray.add(element);

            } 
        });

    },
    languagesList: function(data)
    {
        var languageArray=[];
        console.log(data);
        data.forEach(item=>
            {
                if(item.lang == "en")
                {
                    languageArray.push({id: "en", lang: "English"});
                }
                else if(item.lang =="esp")
                {
                    languageArray.push({id: "esp", lang: "Spanish"});
                }                
                else
                {
                    languageArray.push({id: item.lang, lang: "Other"});
                }
            });
            

        return languageArray;
    },
    posts: function(data)
    {
        var posts=[];
        console.log(data);
        data.forEach(item=>
            { 
                posts.push({title: item.title, content:item.content, date:item.date})                
            });
        return posts; 
    }
};