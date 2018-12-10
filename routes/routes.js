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

  exports.checkAuth = function(req, res, next) {
    if (req.session.user && req.session.user.isAuthenticated) {
      next();
    }else{
      res.redirect('/login');
    }
  }

  var userAccounts = mongoose.model('Account_Collection', accountSchema);

  exports.index = function (req, res) {
    if (req.session.user == null) {
      res.render('home', {
        title: 'Home',
        user: {isAuthenticated: false}
      });
    }
    else {
      console.log("session username home: " + req.session.user.Username);
      res.render('home', {
        title: 'Home',
        user: req.session.user
      });
    }
  };

  exports.login = function (req, res) {
    res.render('login', {

    });
  };
  
  exports.loginPost = function (req, res) {
    var findUser = userAccounts.findOne({Username: new RegExp('^'+req.body.Username+'$', "i")});
    findUser.exec().then(function (acc) {
      if(req.body.Password==acc.Password) {
        req.session.user = {
          isAuthenticated: true,
          Username: acc.Username,
          id: acc.id
        };
        //console.log("session user: " + req.session.user.id);
        // console.log("acc id: " + acc.id);
        res.redirect('/')
        req.session.name = req.session.user.Username + " session";
      }
      else {
        res.render("login"); 
      }
    }).catch(function (err) {
      res.redirect('login');
    });
  };

  exports.logout = function(req, res) {
    req.session.destroy(function(err){
      if(err) {
        console.log(err);
      }else{
        res.redirect('/');
      }
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
    userAccounts.findById(req.session.user.id, function (err, account) {
      if (err) return console.error(err);
      res.render('edit', {
        title: 'Edit Account',
        user: account
      });
      // console.log(req.session.user.id);
      // console.log(account);
    });
  };

  exports.editAccount = function (req, res) {
    userAccounts.findById(req.session.user.id, function (err, account) {
      if (err) return console.error(err);
      account.Username = req.body.Username;
      account.Password = req.body.Password;
      account.Email = req.body.Email;
      account.Age = req.body.Age;
      account.Q1 = req.body.Q1;
      account.Q2 = req.body.Q2;
      account.Q3 = req.body.Q3;
      req.session.user = {
        Username: req.body.Username,
        isAuthenticated: true
      };
      account.save(function (err, account) {
        if (err) return console.error(err);
        console.log(req.body.Username + ' updated');
      });
      console.log("session username: " + req.session.user.Username);
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