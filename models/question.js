const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    paper_name : String,
    SingleCorrect: [],
    MultipleCorrect: [],
    Numerical: []
});

const conn = mongoose.createConnection('mongodb://localhost/qpaper-db', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = conn.model('Question', questionSchema);