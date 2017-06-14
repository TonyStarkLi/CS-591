/**
 * Created by TonyLi on 10/06/2017.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('this is homework1');
});

router.get('/:name', function (req, res, next) {
    let theName = req.params.name
    console.log(theName)
    res.send(JSON.stringify({ "string": theName, "length": theName.length }))
})

router.post('/:name', function (req, res, next) {
    // console.log(req.body.test1)
    // for (item in req.body) {
    //     console.log(item)
    // }
    res.json(req.body.test1)
})

module.exports = router;