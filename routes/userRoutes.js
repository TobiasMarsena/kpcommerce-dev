const passport = require('passport')
const mongoose = require('mongoose')

const User = mongoose.model('users')
const Customer = mongoose.model('customers')

module.exports = app => {
  //ENSURE AUTH
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  }

  // CONTROLLER
  const instagramController = require('../controllers/instagramController')()
  const youtubeController = require('../controllers/youtubeController')()
  const snapController = require('../controllers/snapController')()

  //USERS
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/profile', async (req, res) => {
    var send;
    if (req.user) {
      if (req.user.id) {
        const user = await User.findOne({ id: req.user.id })
        const customer = await Customer.findOne({ id: user.id })
        send = {
          user: user,
          customer: customer
        }
      } else if (req.user.email) {
        const user = await User.findOne({ email: req.user.email })
        const customer = await Customer.findOne({ email: user.email })
        send = {
          user: user,
          customer: customer
        }
      }
    }
    res.send(send)
  })
  app.post('/api/profile/edit', ensureAuthenticated, async (req, res) => {
    if (req.user.id) {
      const user = await User.findOne({ id: req.user.id })
      user.name = req.body.first_name + ' ' + req.body.last_name
      user.save()
      var customer = await Customer.findOne({ id: user.id })
      if (!customer) {
        customer = new Customer()
      }
      customer.id = user.id
      customer.phone = req.body.phone
      customer.address.push({
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country
      })
      customer.bank_account = req.body.bank_account
      customer.save()
    } else if (req.user.email) {
      const user = await User.findOne({ email: req.user.email })
      user.name = req.body.first_name + ' ' + req.body.last_name
      user.save()
      var customer = await Customer.findOne({ email: user.email })
      if (!customer) {
        customer = new Customer()
      }
      customer.email = user.email
      customer.phone = req.body.phone
      customer.address.push({
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country
      })
      customer.bank_account = req.body.bank_account
      customer.save()
    }
    res.redirect('/profile')
  })
  //=> Get yourself profile data
  app.get('/api/instagram/users/self', ensureAuthenticated, instagramController.getYourself);
  //=> Get yourself media
  app.get('/api/instagram/users/self/media', ensureAuthenticated, instagramController.getYourselfMedia);

  //=> Get Youtube subscription list
  app.get('/api/subscriptions', ensureAuthenticated, youtubeController.getSubscription);

  app.post('/api/payment', ensureAuthenticated, snapController.getPaymentToken);
}
