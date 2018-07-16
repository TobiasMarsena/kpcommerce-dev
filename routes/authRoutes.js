const passport = require('passport')
const mongoose = require('mongoose')
const _ = require('lodash')
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
}
