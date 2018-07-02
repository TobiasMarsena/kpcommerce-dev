const passport = require('passport')
const mongoose = require('mongoose')

const User = mongoose.model('users')

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  //AUTH
  app.get('/auth/google', passport.authenticate('youtube'));
  app.get('/auth/instagram', passport.authenticate('instagram'));
  app.get('/auth/google/callback', passport.authenticate('youtube'),
  (req, res) => {
    res.redirect('http://localhost:3000');
  })
  app.get('/auth/instagram/callback', passport.authenticate('instagram'),
  (req, res) => {
    res.redirect('http://localhost:3000');
  });

  app.post('/auth/register', (req, res) => {
    User.findOne({ name: req.body.email })
      .then((user) => {
        if (!user) {
          new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          }).save()
        }
      })
    res.redirect('/')
  })
  app.post('/auth/login', (req, res) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          if (user.password == req.body.password) {
            console.log("Berhasil Login")
          } else {
            console.log("Gagal Login")
          }
        } else {
          console.log("User tidak ada")
        }
      })
    res.redirect('/')
  })

  //LOGOUT
  app.get('/api/logout',
    (req, res) => {
      req.logout();
      res.redirect('/login')
    });
}
