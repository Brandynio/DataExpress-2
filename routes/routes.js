var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {
});

var accountSchema = mongoose.Schema({
    Username: String,
    Password: String,
    Email: String,
    Age: String,
    Q1: String,
    Q2: String,
    Q3: String
  });

  var userAccounts = mongoose.model('Account_Collection', accountSchema);

  exports.index = function (req, res) {
    userAccounts.find(function (err, account) {
      if (err) return console.error(err);
      res.render('index', {
        title: 'Account List',
        user: account
      });
    });
  };

  exports.create = function (req, res) {
    res.render('create', {
        title: 'Create Account'
    });
  };

  exports.createAccount = function (req, res) {
    var account = new userAccounts({
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Age: req.body.Age,
      Q1: req.body.Q1,
      Q2: req.body.Q2,
      Q3: req.body.Q3
    });
    account.save(function (err, account) {
      if (err) return console.error(err);
      console.log(req.body.Username + ' added');
    });
    res.redirect('/');
  };

  exports.edit = function (req, res) {
    userAccounts.findById(req.params.id, function (err, account) {
      if (err) return console.error(err);
      res.render('edit', {
        title: 'Edit Account',
        account: account
      });
    });
  };

  exports.editAccount = function (req, res) {
    userAccounts.findById(req.params.id, function (err, account) {
      if (err) return console.error(err);
      account.username = req.body.Username;
      account.password = req.body.Password;
      account.email = req.body.Email;
      account.age = req.body.Age;
      account.answer1 = req.body.Q1;
      account.answer2 = req.body.Q2;
      account.answer3 = req.body.Q3;

      accountSchema.save(function (err, account) {
        if (err) return console.error(err);
        console.log(req.body.Username + ' updated');
      });
    });
    res.redirect('/');
  };

  exports.delete = function (req, res) {
    accountSchema.findByIdAndRemove(req.params.id, function (err, account) {
      if (err) return console.error(err);
      res.redirect('/');
    });
  };

  exports.details = function (req, res) {
    accountSchema.findById(req.params.id, function (err, account) {
      if (err) return console.error(err);
      res.render('details', {
        title: account.Username + "'s Details",
        account: account
      });
    });
  };