const express = require("express");
const router = express.Router();
const cors = require('cors');
const {User,Questiondb} = require('../models/user');

router.get('/paperlist', cors(), (req, res) => {
    
    Questiondb.find({},{_id:0,paper_name:1},
        function (err, docs) {
            res.json(docs)
        }   
    )
});

router.delete('/paperdelete', cors(), (req, res) => {
    
    Questiondb.remove({paper_name:req.body.name},
        function (err, docs) {
            res.json(docs)
        }   
    )
});

router.delete('/questiondelete', cors(), (req, res) => {
    console.log("deletequestion")
    console.log(req.body)

    let query;
    if (req.body.questiontype === 'Single-Correct') {
        query = {$pull: { SingleCorrect: {question:req.body.question } }};
    }
    if (req.body.questiontype === 'Multiple-Correct') {
        query = {$pull: { MultipleCorrect: {question:req.body.question } }};
    }
    if (req.body.questiontype === 'Numerical') {
        query = {$pull: { Numerical: {question:req.body.question } }};
    }
    // query = {$pull : {"SingleCorrect":{question:req.body.question }}};
    console.log({ paper_name: req.body.name },
        query)
    Questiondb.findOneAndUpdate(
        { paper_name: req.body.name },
        query,
        {
            returnNewDocument: true
        }, function (error, result) {
            // console.log(error)
            // console.log(result)
        }
    
    )
});



module.exports = router