const passport = require('passport')
const mongoose = require('mongoose')
const YoutubeV3Strategy = require('passport-youtube-v3').Strategy
const InstagramStrategy = require('passport-instagram').Strategy
const LocalStrategy = require('passport-local').Strategy

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

// Local Strategy
passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
},
  (username, password, done) => {
    User.findOne({ email: username})
      .then((user) => {
        if (!user) { return done(null, false) }
        if (user.comparePassword(password, user.password)) { return done(null, user) }
      })
  }))

//Youtube Strategy
passport.use(new YoutubeV3Strategy({
  clientID: keys.GoogleParams.client_id,
  clientSecret: keys.GoogleParams.client_secret,
  callbackURL: keys.GoogleParams.redirect_uri
},
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ id: profile.id})
      .then((user) => {
        if (!user) {
        new User({
          id: profile.id
        }).save()
        }
      })
    var user = {};
    user.id = profile.id,
    user.access_token = accessToken,
    user.refresh_token = refreshToken
    return done(null, user)
  }))
//Instagram Strategy
passport.use(new InstagramStrategy({
  clientID: keys.InstagramParams.client_id,
  clientSecret: keys.InstagramParams.client_secret,
  callbackURL: keys.InstagramParams.redirect_uri
},
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ id: profile.id})
      .then((user) => {
        if (!user) {
        new User({
          id: profile.id
        }).save()
        }
      })
    var user = {};
    user.id = profile.id,
    user.access_token = accessToken,
    user.refresh_token = refreshToken
    return done(null, user)
  }
));
