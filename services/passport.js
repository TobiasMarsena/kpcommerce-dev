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
  async (username, password, done) => {
    const user = await User.findOne({ email: username})
    if (!user) { return done(null, false) }
    if (user.comparePassword(password, user.password)) { return done(null, user) }
  }))

//Youtube Strategy
passport.use(new YoutubeV3Strategy({
  clientID: keys.GoogleParams.client_id,
  clientSecret: keys.GoogleParams.client_secret,
  callbackURL: keys.GoogleParams.redirect_uri
},
  async (accessToken, refreshToken, profile, done) => {
    var user = await User.findOne({ id: profile.id})
    if (!user) {
    new User({
      id: profile.id
    }).save()
    }
    user = {};
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
  async (accessToken, refreshToken, profile, done) => {
    var user = await User.findOne({ id: profile.id})
    if (!user) {
    new User({
      id: profile.id
    }).save()
    }
    user = {};
    user.id = profile.id,
    user.access_token = accessToken,
    user.refresh_token = refreshToken
    return done(null, user)
  }
));
