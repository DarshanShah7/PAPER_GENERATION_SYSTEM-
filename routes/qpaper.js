const express = require("express");
const router = express.Router();
const cors = require('cors');
const { User, Questiondb, Marksdb } = require('../models/user');
var ObjectId = require('mongodb').ObjectID

router.post('/validate_paper', cors(), (req, res) => {
    console.log(req.body);

    Questiondb.find({ paper_id: req.body.paper_id, password: req.body.password }, async function (err, docs) {
        console.log("debug1")
        if (err) {
            console.log(err);
            // console.log("debug2")
        }
        else {
            //  console.log(docs)
            if (docs.length === 0) {
                res.send({ success: false })
            }
            else {
                res.send({ success: true })
            }
        }
    }
    );
})


router.post('/store_marks', cors(), async(req, res) => {

    const newentry = await new Marksdb(req.body);
    await newentry.save()
    res.send({ success: true })

})

router.post('/paperlist', cors(), (req, res) => {
    // console.log(req.body)
    Questiondb.find({ author: req.body.user }, { _id: 0, paper_name: 1 },
        function (err, docs) {
            res.json(docs)
        }
    )
});

router.post('/attemptedpaperlist', cors(), (req, res) => {
    console.log(req.body)
    Marksdb.find({ username: req.body.user }, { _id: 0, paper_id: 1 },
        function (err, docs) {
            res.json(docs)
        }
    )
});

router.delete('/paperdelete', cors(), (req, res) => {

    Questiondb.remove({ paper_name: req.body.name },
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
        query = { $pull: { SingleCorrect: { _id: ObjectId(req.body.id) } } };
    }
    if (req.body.questiontype === 'Multiple-Correct') {
        query = { $pull: { MultipleCorrect: { _id: ObjectId(req.body.id) } } };
    }
    if (req.body.questiontype === 'Numerical') {
        query = { $pull: { Numerical: { _id: ObjectId(req.body.id) } } };
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