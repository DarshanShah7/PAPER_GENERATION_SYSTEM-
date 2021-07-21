const express = require("express");
const router = express.Router();
const { Imagedb } = require('../models/user');
const axios = require('axios')
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
// Note: Require the cpu and webgl backend and add them to package.json as peer dependencies.
require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const ObjectDetectors = require('./objdetector')
// Step 5 - set up multer for storing uploaded files

router.post('/save_image', async (req, res, next) => {
    // console.log(req.body)
    var image = req.body.img;

    var data = image.replace(/^data:image\/\w+;base64,/, '');
    try{
        const objectDetect = new ObjectDetectors(data, 'image/jpeg;base64');
    const results = await objectDetect.process();
    console.log("hiiiiiiiiiiiiiiiiiiiiiiii")
    console.log(results);
    }
    catch(err){
    console.log("biiiiiiiiiiiiiiiiiiiiiiii")
    console.log(err)
    }
    


    // const model = await cocoSsd.load();

    // // Classify the image.
    // const predictions = await model.detect(data);

    // console.log('Predictions: ');
    // console.log(predictions);

    var filename = req.body.user + '-' + Date.now()
    fs.writeFile(path.join(__dirname + '/..' + '/uploads/' + filename), data, { encoding: 'base64' }, function (err) {
        console.log(path.join(__dirname + '/..' + '/uploads/' + filename))
        var obj = {
            user: req.body.user,
            paper_id: req.body.paper_id,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/..' + '/uploads/' + filename)),
                contentType: 'image/jpeg;base64'
            }
        }
        Imagedb.create(obj, (err, item) => {
            if (err) {
                console.log(err);
            }
            else {
                item.save();
                // res.redirect('/');
            }



        });
    });

});

// router.post('/save_image', cors(), async(req, res) => {

//     console.log(req.body);
//     try{
//         const newpaper = await new Imagedb(req.body);
//         await newpaper.save()
//         res.send({success:true})
//     }
//     catch(err){
//         res.send({success:false})
//     }

// })


module.exports = router;