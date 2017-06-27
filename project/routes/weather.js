const express = require('express')
const router = express.Router()
const weather = require('yahoo-weather')

router.get('/:location', function (req, res, next) {

    let str = req.params.location;

    // weather('tehran').then(info => {
    //     // Do what you want with `info`!
    // }).catch(err => {
    //     // Oops! Errors! :(
    // });

    weather(str, 'c').then(info => { // second arg is the weather unit. you can pass 'c' or 'f'. defaults to 'c'.
        data = {
            "wind": info.wind,
            "atmosphere": info.atmosphere,
            "astronomy": info.astronomy
        };
    }).catch(err => {
        // Oops! Errors! :(
    });

// or use it with awesome async & await
//     async () => {
//         try {
//             const info = await weather('tehran');
//             // Do what you want with `info`!
//         } catch (err) {
//             // Oops! Errors! :(
//         }
//     }();

    res.send(data)

})

module.exports = router