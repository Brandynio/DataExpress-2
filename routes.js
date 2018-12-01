var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var accounts = mongoose.Schema({
    userName: String,
    password: String,
    email: String,
    age: String,
    answer1: String,
    answer2: String,
    answer3: String,
  });