/**
 * Created by TonyLi on 10/06/2017.
 */
const express = require('express');
const router = express.Router();


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/hw2')
const db = mongoose.connection
db.once('open', function () {
    console.log('Connection successful.')
})

// Create Schema for DataBase
const Schema = mongoose.Schema
const stringSchema = new Schema({
    string: String,
    length: Number
})

const string = mongoose.model('string', stringSchema)

/*
 * Finish Pre-work
 */


/*
 * Step 1:
 * GET: When passing a string on the query (i.e. http://localhost:3000/hw2/
 longstring), first look in the database to see if the string is already present.
 If it is, return the string and its length as read from the database. If it isn’t,
 compute the length, store the string and its length in the database, and return
 both to the client.
 */

let findByName = function (checkName) {
    return new Promise(function (resolve, reject) {
        string.find({string: checkName}, function (err, results) {

            // Find it
            if (results.length > 0) {
                console.log("we find it")
                resolve({string: results[0].string, length: results[0].length})
            }
            // Does not find it
            else {
                console.log("we did not find it")
                reject({found: false})
            }
        })
    })
}

router.get('/:name', function (req, res, next) {
    let s = req.params.name
    findByName(s)
        .then(function (status) {
            res.json(status)
        })
        .catch(function (status) {

            //console.log(s.length)
            const aString = new string( {string : s, length: s.length} )

            aString.save(function (err) {
                if (err) {res.send(err)}
                else{
                    console.log("successfully saved")
                    res.send({string: s, length: s.length})
                }
            })
        })
})



/*
 * Step 2:
 * GET (new route): If no parameter is passed on the URI (i.e. http://localhost: 3000/hw2),
 * return all strings currently stored in the database.
 */
router.get('/', function (req, res, next) {
    string.find({}, function (err, results) {
        console.log('this is the database')
        res.json(results)
    })
})

/*
 * Step 3:
 * POST: Similar to the GET, when passed a string, first look in the database to see if
 * the string is already present. If it is, return the string and its length as read from
 * the database. If it isn’t, compute the length, store the string and its length in the
 * database, and return both to the client. If no string is passed, return a message in
 * JSON format prompting the user to provide a string.
 */
router.post('/', function (req, res, next) {
    //console.log(req.body.string)
    let s = req.body.string
    if (s == "") {
        res.send(JSON.stringify("please provide a string"))
    }

    findByName(req.body.string)
        .then(function (status) {
            res.json(status)
        })
        .catch(function (status) {

            //console.log(s.length)
            const aString = new string( {string : s, length: s.length} )

            aString.save(function (err) {
                if (err) {res.send(err)}
                else{
                    console.log("successfully saved")
                    res.send({string: s, length: s.length})
                }
            })
        })

})

/*
 * Step 4:
 * DELETE: This route takes a string, and if the string is present in the database,
 * it deletes the document and returns a message in JSON format indicating success.
 * If the string is not present, return a ‘string not found’ message in JSON format.
 */

router.delete('/:string', function(req, res, next) {

    let s = req.params.string

    console.log(s)

    findByName(s)
        .then(function (status) {
            string.remove({ string: req.params.string }, function(err) {
                if (!err) {
                    return res.send('User deleted!');
                } else {
                    return res.send('Error deleting user!');
                }
            });
        })
        .catch(function (status) {
            res.send(JSON.stringify("string not found"))
        })


});




module.exports = router;