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
const {promisify} = require('util');
const { domainToASCII } = require("url");
const readFile = promisify(fs.readFile)





router.post('/save_image', async (req, res, next) => {
    console.log(req.body)
    var image = req.body.img;
    var is_suspicious = false
    var data = image.replace(/^data:image\/\w+;base64,/, '');
    try {
        const objectDetect = new ObjectDetectors(data, 'image/jpeg;base64');
        const results = await objectDetect.process();
        console.log("hiiiiiiiiiiiiiiiiiiiiiiii")
        console.log(results);

        if (results.data.length !== 1)
            is_suspicious = true
        // console.log(results.data.length)
    }
    catch (err) {
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
                filename: path.join(__dirname + '/..' + '/uploads/' + filename),
                contentType: 'image/jpeg;base64',
                flag: is_suspicious
            }
        }
        console.log("hiiiiiiiiiiiiiiiiiiiiiiii")

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


router.get('/image', async (req, res, next) => {
    // console.log(req.body)

    await Imagedb.find({}, async function (err, docs) {
        console.log("debug1")
        if (err) {
            console.log(err);
            // console.log("debug2")
        }
        else {
            // console.log(docs)
            async function combine(docs, array){
                // console.log(array)
                results = []
                for (let i = 0; i < docs.length; i++) {
                        var a ={
                            details:docs[i],
                            image:array[i],
                            time: docs[i]._id.getTimestamp(),
                            flag: docs[i].img.flag
                        }
                        console.log(docs[i].img.flag)
                        results.push(a)
                    //   docs[i].image = array[i] ;
                    //   console.log(a)
                  }
                  
                  return results


            }
            promisified_combine = promisify( combine)

            async function executeMe() {
                try {
                  const arrayWithFilesContent = await Promise.all(
                    docs.map(obj=> readFile(obj.img.filename,{ encoding: 'base64' } ) 
                )
                  );
                  console
                  promisified_combine(docs,arrayWithFilesContent).then(
                      res.send(results)
                  )

                  
                //   return analyze(arrayWithFilesContent);
                }
                catch (err) {
                  console.log(err)
                }
              }
              
              executeMe();

            // for (let i = 0; i < docs.length; i++) {
                
            //     await fs.readFile(docs[i].img.filename, { encoding: 'base64' }, async function (err, data) {
            //         console.log(docs[i].img.filename)
            //         docs[i].image = data;
            //         // console.log(docs[i].image)
            //         if(i===docs.length-1){
            //             console.log("hi")
            //             // res.send(docs);
            //             // console.log(docs)
            //         }
                    

            //     });
            //     res.send(docs[i].image)
            // }
            
            
            
            // if (docs.length === 0) {
            //     res.send({ success: false })
            // }
            // else {
            //     res.send({ success: true })
            // }
        }
    }
    );

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