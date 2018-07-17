const passport = require('passport')
const mongoose = require('mongoose')
const _ = require('lodash')
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt-nodejs')

const User = mongoose.model('users')

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  async function firstTimeRedirect(req, res) {
    const user = await User.findOne({ id: req.user.id })
    if (!user.name) { res.redirect('http://localhost:3000/profile/edit') }
    else { res.redirect('http://localhost:3000'); }
  }

  //AUTH
  app.get('/auth/google', passport.authenticate('youtube'));
  app.get('/auth/instagram', passport.authenticate('instagram'));
  app.get('/auth/google/callback', passport.authenticate('youtube'),
    firstTimeRedirect);
  app.get('/auth/instagram/callback', passport.authenticate('instagram'),
    firstTimeRedirect);

  app.post('/auth/register', async (req, res) => {
    var user = await User.findOne({ email: req.body.email })
    if (!user) {
      user = new User()
      user.id = bcrypt.hashSync(_.uniqueId(), bcrypt.genSaltSync(8))
      user.name= req.body.name
      user.email= req.body.email
      user.password= user.hashPassword(req.body.password)
      user.save()
    }
    req.login(user, () => { return res.redirect('/profile/edit') })
  })
  app.post('/auth/login', passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('http://localhost:3000')
  })

  //LOGOUT
  app.get('/api/logout',
    (req, res) => {
      req.logout();
      res.redirect('/login')
  });

  // FORGOT PASSWORD
  app.get('/auth/forgot', (req, res) => {
      res.redirect('/forgot');
  });

  app.post('/auth/forgot', (req, res, next) => {
      async.waterfall([
        // Set Reset Token
        function(done){
          crypto.randomBytes(20, function(err, buf){
            var token = buf.toString('hex');
            done(err, token);
          })
        },
        function(token, done){
          User.findOne({ email: req.body.email}, function(err, user){
            if(!user){
              return res.redirect('/forgot');
            }

            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000;

            user.save(function(err){
              done(err, token, user);
            });

          });
        },
        // Send Mail to retrieve token
        function(token, user, done){
          var smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'fianpress@gmail.com',
              pass: 'fian_press24'
            }
          });
          var mailOptions = {
            to: user.email,
            from: 'fianpress@gmail.com',
            subject: 'Password Reset',
            text: 'You are receiving this because you have requested the reset of the password' +
                  'Please click on the following link, or paste this into your browser to complete the process:\n\n ' +
                  'http://localhost:3333/reset/' + token + '\n\n' +
                  'If you did not request this, please ignore this email and your password will remain unchange.'
          };
          smtpTransport.sendMail(mailOptions, function(err){
            if(err){
              console.log(err);
            }else{
              done(err, 'done');
            }
          });
        }, function(err){
              if(err){
                res.redirect('/check-mail')
              } else {
                res.redirect('/forgot');
              }
           }
      ]);
  });

  app.get('/reset/:token', function(req, res){
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now()}}, function(err, user){
      if(!user){
        return res.redirect('/forgot');
      }
      res.redirect('http://localhost:3000/reset/'+req.params.token);
    });
  });

  app.post('/api/reset/:token', function(req, res){
    async.waterfall([
      function(done){
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now()}}, function(err, user){

          if(!user){
            return res.redirect('/forgot');
          }
            user.password = user.hashPassword(req.body.password);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
                res.redirect('/');
              });
            });
        });
      },
      function(user, done){
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'fianpress@gmail.com',
            pass: 'fian_press24'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'fianpress@gmail.com',
          subject: 'Your password has been changed',
          text: 'Hello, \n\n' +
                'This is a confirmation that the password for your account ' + user.mail + ' has just been changed.\n'
        };

        smtpTransport.sendMail(mailOptions, function(error){
          done(err);
        });
      }

    ], function(err){
        res.redirect('/');
      });
  });
}
