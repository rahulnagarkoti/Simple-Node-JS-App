const fetch = require('node-fetch');

module.exports = 
{
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
        var languageArray=[{id:"all",lang:"All"}];
        data.forEach(item=>
            {
                if(item.lang == "en")
                {
                    languageArray.push({id: "en", lang: "English"});
                }
                else if(item.lang =="es")
                {
                    languageArray.push({id: "es", lang: "Spanish"});
                }                
                else
                {
                    languageArray.push({id: item.lang, lang: "Other"});
                }
            });
            //filter out the distinct elements only
            const unique = Array.from(new Set(languageArray.map(a => a.id)))
            .map(id => {
              return languageArray.find(a => a.id === id)
            });
        return unique;
    },
    posts: function(data)
    {
        var posts=[];
        data.forEach(item=>
            { 
                var tempDate= item.date.split(" ")[0];
                posts.push({title: item.title, content:item.content, date: tempDate, lang: item.lang})                
            });
        return posts; 
    }
};