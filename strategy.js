const { domain, clientID, clientSecret }= require('./config');
const Auth0Strategy= require('passport-auth0');

//constructor function that formats a new request to be sent to Auth.0
//creates a configuration object 
module.exports = new Auth0Strategy({
  domain,
  clientID,
  clientSecret,
  callbackURL:  '/login'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

//serializeUser is the next function in the chain