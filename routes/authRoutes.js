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
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          user = new User()
          user.name= req.body.name
          user.email= req.body.email
          user.password= user.hashPassword(req.body.password)
          user.save()
        }
        req.login(user, () => { return res.redirect('/') })
      })
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
}
