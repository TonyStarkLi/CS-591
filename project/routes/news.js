const express = require('express')
const router = express.Router()




router.get('/:name', function (req, res, next) {

    let NewsAPI = require('newsapi');

    let newsapi = new NewsAPI('8f7476c142c84043ada82482be3f0fa0');

    let str = req.params.name;



    console.log(str)
// // To query articles:
//     newsapi.articles({
//         source: 'associated-press', // required
//         sortBy: 'top' // optional
//     }).then(articlesResponse => {
//         console.log(articlesResponse);
//     /*
//      {
//      status: "ok",
//      source: "associated-press",
//      sortBy: "top",
//      articles: [
//      ...
//      ]
//      }
//      */
// })


// To query sources:
    newsapi.sources({
        category: str, // optional
        language: 'en', // optional
        country: 'us' // optional
    }).then(sourcesResponse => {
        mydata = sourcesResponse.sources[0].url

    /*
     {
     status: "ok",
     sources: [
     ...
     ]
     }
     */
    });

// // For both methods you can also use traditional Node callback style:
//     newsapi.articles({
//         source: 'associated-press',
//         sortBy: 'top'
//     }, (err, articlesResponse) => {
//         if (err) console.error(err);
//     else console.log(articlesResponse);
// });


    res.send(mydata)

})

module.exports = router