const passport = require('passport')
const mongoose = require('mongoose')

const User = mongoose.model('users')
const Customer = mongoose.model('customers')

module.exports = app => {
  //ENSURE AUTH
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('http://localhost:3000/login');
  }

  // CONTROLLER
  const instagramController = require('../controllers/instagramController')()
  const youtubeController = require('../controllers/youtubeController')()
  const snapController = require('../controllers/snapController')()

  //USERS
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
  app.post('/api/profile/edit', ensureAuthenticated, (req, res) => {
    if (req.user.id) {
      User.findOne({ id: req.user.id })
        .then((user) => {
          user.name = req.body.first_name + ' ' + req.body.last_name
          user.save()
          Customer.findOne({ id: user.id })
            .then((customer) => {
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
            })
        })
    } else if (req.user.email) {
      User.findOne({ email: req.user.email })
        .then((user) => {
          user.name = req.body.first_name + ' ' + req.body.last_name
          user.save()
          Customer.findOne({ email: user.email })
            .then((customer) => {
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
            })
        })
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
