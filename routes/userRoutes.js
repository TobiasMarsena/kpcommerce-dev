const passport = require('passport')

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
  //=> Get yourself profile data
  app.get('/api/instagram/users/self', ensureAuthenticated, instagramController.getYourself);
  //=> Get yourself media
  app.get('/api/instagram/users/self/media', ensureAuthenticated, instagramController.getYourselfMedia);

  //=> Get Youtube subscription list
  app.get('/api/subscriptions', ensureAuthenticated, youtubeController.getSubscription);

  app.post('/api/payment', ensureAuthenticated, snapController.getPaymentToken);
}
