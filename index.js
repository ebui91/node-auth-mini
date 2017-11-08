const express = require('express');
const session = require('express-session');
const passport= require('passport');
const { secret }= require('./config');
const strategy= require('./strategy');

const app = express();

app.use(session({
  secret,
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

//fired once on initial login
//user came from Auth0Strategy
//puts the user onto our session
//locks user data
//req.user 
passport.serializeUser(function(user, done) {
  done(null, user);
});

//fired for every request back to the Server
//augment or update user data
//unlocks user data for us to interact with from client to server
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//ENDPOINTS
app.get('/login', passport.authenticate('auth0', { successRedirect: '/me', failureRedirect: '/login', failureFlash: true }));
app.get('/me', (req, res, next)=> {
  if(req.user){
    res.json(req.user);
  }else{
//res.redirect() is a built-in Express method    
    res.redirect('/login');
  }
});

const port = 3000;
app.listen( port, () => { console.log(`WE LIVE BABY on port ${port}`); } );