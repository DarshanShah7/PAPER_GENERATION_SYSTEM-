const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    paper_name : String,
    SingleCorrect: [],
    MultipleCorrect: [],
    Numerical: []
});


module.exports = mongoose.model('Question', questionSchema);