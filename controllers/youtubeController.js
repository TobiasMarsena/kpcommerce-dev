const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const config = require('../config/config')

module.exports = () => {
  var oauth2Client = new OAuth2(
    config.GoogleParams.client_id,
    config.GoogleParams.client_secret,
    config.GoogleParams.redirect_uri,
  );
  function getCredentials(req) {
    oauth2Client.credentials = {
        access_token: req.user.access_token,
        refresh_token: req.user.refresh_token
    };
  };
  return {
    // Return your subscription list
      getSubscription: (req, res) => {
        getCredentials(req);
        google.youtube({
            version: 'v3',
            auth: oauth2Client
        }).subscriptions.list({
            part: 'snippet',
            mine: true,
            pageToken: req.query.pageToken,
            headers: {}
        }, function(err, data, response) {
            if (err) {
                console.error('Error: ' + err);
                res.json({
                    status: "error"
                });
            }
            if (data.data) {
                res.json({
                    status: "ok",
                    data: data.data
                });
            }
            if (response) {
                console.log('Status code: ' + response.statusCode);
            }
        });
      }
  }
}
