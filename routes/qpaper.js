const express = require("express");
const router = express.Router();
const cors = require('cors');
const { Questiondb, Marksdb } = require('../models/user');
var ObjectId = require('mongodb').ObjectID;
const { Minimum, Maximum, data } = require("@tensorflow/tfjs");


// create a new paper in database
router.post('/create_paper', cors(), async (req, res) => {

    console.log(req.body);
    try {
        const newpaper = await new Questiondb(req.body);
        await newpaper.save()
        res.send({ success: true })
    }
    catch (err) {
        res.send({ success: false })
    }

})

// save a question in an existing paper
router.post('/savequestion', cors(), (req, res) => {

    console.log(req.body);

    Questiondb.find({ paper_name: req.body.paper_name }, async function (err, docs) {
        console.log("debug1")
        if (err) {
            console.log(err);
            // console.log("debug2")
        }
        else {
            //  console.log(docs)
            if (docs.length === 0) {
                // console.log(docs)
                const newpaper = await new Questiondb({ paper_name: req.body.paper_name });
                await newpaper.save();
            }
            let query;
            req.body.question._id = ObjectId()
            if (req.body.question.questiontype === 'Single-Correct') {
                query = { $push: { SingleCorrect: req.body.question } };
            }
            if (req.body.question.questiontype === 'Multiple-Correct') {
                query = { $push: { MultipleCorrect: req.body.question } };
            }
            if (req.body.question.questiontype === 'Numerical') {
                query = { $push: { Numerical: req.body.question } };
            }

            let name = Questiondb.findOneAndUpdate(
                { paper_name: req.body.paper_name },
                query,
                {
                    returnNewDocument: true
                }, function (error, result) {
                    // console.log(error)
                    // console.log(result)
                }
            )
            // console.log(name)
        }
    }
    );
})

// get question paper from using paper_name 
// TODO : change this to paper_id because paper_name is not unique 
router.post('/login/paper', function (req, res) {
    console.log(req.body)
    Questiondb.find({ paper_id: req.body.paper_id }, function (err, docs) {

        res.json(docs[0]);
        // console.log(docs)
    });
})

// get question paper from using paper_id 
router.post('/login/teacher-paper', function (req, res) {
    console.log(req.body)
    Questiondb.find({ paper_name: req.body.paper_name }, function (err, docs) {

        res.json(docs[0]);
        // console.log(docs)
    });
})

// validate credentials entered by student before starting paper 
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

// store marks to marks database
router.post('/store_marks', cors(), async (req, res) => {

    const newentry = await new Marksdb(req.body);
    await newentry.save()
    res.send({ success: true })

})

router.post('/analysis', cors(), (req, res) => {
    let Minimum
    let Maximum
    let Average
    

    Marksdb.aggregate( [{ $match: { paper_id: req.body.paper_id } } ,{ $group: { _id: "$paper_id", Average: { $avg: "$totalmarks" } } } ],
    function (err, docs) {
        // console.log("debug1")
        if (err) {
            console.log(err);
            // console.log("debug2")
        }
        else {
            Average = docs[0].Average
            // console.log(docs)

        }
    }
    );

    Marksdb.aggregate( [{ $match: { paper_id: req.body.paper_id } } ,{ $group: { _id: "$paper_id", Minimum: { $min: "$totalmarks" } } } ],
    function (err, docs) {
        // console.log("debug1")
        if (err) {
            console.log(err);
            // console.log("debug2")
        }
        else {
            Minimum = docs[0].Minimum
            // console.log(docs)

        }
    }
    );

    Marksdb.aggregate( [{ $match: { paper_id: req.body.paper_id } } ,{ $group: { _id: "$paper_id", Maximum: { $max: "$totalmarks" } } } ],
    function (err, docs) {
        // console.log("debug1")
        if (err) {
            console.log(err);
            // console.log("debug2")
        }
        else {
            Maximum = docs[0].Maximum
            Marksdb.find({ paper_id: req.body.paper_id,username:req.body.user }, async function (err, docs) {
                // console.log("debug1")
                if (err) {
                    console.log(err);
                    // console.log("debug2")
                }
                else {
                    let data = {}
                    data.total = docs[0].totalmarks
                    data.total_sc = docs[0].totalmarks_sc
                    data.total_mc = docs[0].totalmarks_mc
                    data.total_n = docs[0].totalmarks_n
                    data.min = Minimum
                    data.max = Maximum
                    data.avg = Average
                    // console.log(data)
                    res.send(data)
                }
            }
        
            );
            

        }
    }
    );
})

// to show papers created by a specific teacher in teacher login 
router.post('/paperlist', cors(), (req, res) => {
    // console.log(req.body)
    Questiondb.find({ author: req.body.user }, { _id: 0, paper_name: 1 },
        function (err, docs) {
            res.json(docs)
        }
    )
});

// to show papers attempted by a specific student in student login 
router.post('/attemptedpaperlist', cors(), (req, res) => {
    console.log(req.body)
    Marksdb.find({ username: req.body.user }, { _id: 0, paper_id: 1 },
        function (err, docs) {
            res.json(docs)
        }
    )
});

// teacher login : delete complete paper
router.delete('/paperdelete', cors(), (req, res) => {

    Questiondb.remove({ paper_name: req.body.name },
        function (err, docs) {
            res.json(docs)
        }
    )
});

// teacher login : delete a particular question in a paper using question id
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

// store marks to marks database
router.get('/get_marks', cors(), async (req, res) => {

    Marksdb.find({ paper_id: req.body.paper_id },
        function (err, docs) {
            res.json(docs)
        }
    )


})

module.exports = router