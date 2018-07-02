const passport = require('passport')
const mongoose = require('mongoose')
const YoutubeV3Strategy = require('passport-youtube-v3').Strategy
const InstagramStrategy = require('passport-instagram').Strategy

// MongoDB models
const User = mongoose.model('users')

//Keys
const keys = require('../config/config')

//Passport session setup
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//Youtube Strategy
passport.use(new YoutubeV3Strategy({
  clientID: keys.GoogleParams.client_id,
  clientSecret: keys.GoogleParams.client_secret,
  callbackURL: keys.GoogleParams.redirect_uri
},
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id})
      .then((user) => {
        if (!user) {
        new User({
          googleId: profile.id,
          name: profile.displayName,
          image: profile._json.items[0].snippet.thumbnails.default.url
        }).save()
        }
      })
    var user = {};
    user.id = profile.id,
    user.access_token = accessToken,
    user.refresh_token = refreshToken,
    user.name = profile.displayName,
    user.image = profile._json.items[0].snippet.thumbnails.default.url
    return done(null, user)
  }))
//Instagram Strategy
passport.use(new InstagramStrategy({
  clientID: keys.InstagramParams.client_id,
  clientSecret: keys.InstagramParams.client_secret,
  callbackURL: keys.InstagramParams.redirect_uri
},
  (accessToken, refreshToken, profile, done) => {
    var user = {};
    user.id = profile.id,
    user.access_token = accessToken,
    user.refresh_token = refreshToken,
    user.name = profile.displayName,
    user.image = profile._json.data.profile_picture
    return done(null, user)
  }
));
