//Question 1:
    //Which Neumont degree is the best?
        //A. Web Development and Design
        //B. Software and Game Development
        //C. Information Systems
        //D. Technology Managment
        //E. Computer Science

//Question 2:
    //Which Pokemon generation is the best?
        //A. Gen 1
        //B. Gen 2
        //C. Gen 3
        //D. Gen 4
        //E. Gen 5
        //F. Gen 6
        //G. Gen 7

//Question 3:
    //What system do you mainly play games on?
        //A. PC
        //B. PS4
        //C. Xbox One
        //D. Switch
        //E. I don't play games

var express = require('express'),
  pug = require('pug'),
  bodyParser = require('body-parser'),
  expressSession = require('express-session'),
  path = require('path');

var app = express();

var checkAuth = function(req, res, next) {
  if (req.session.user && req.session.user.isAuthenticated) {
    next();
  }else{
    res.redirect('/');
  }
}

app.set('view engine', 'pug');
app.set('views', __dirname+'/views');
app.use(express.static(path.join(__dirname+'/public')));

app.use(expressSession({
  secret: 'SessionSecret10293',
  saveUninitialized: true,
  resave: true
}));

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/', function(req, res){
  res.render('home');
});

app.listen(3000);