const axios = require('axios')
const encode = require('nodejs-base64-encode');

const config = require('../config/config')

module.exports = () => {
  // Request URL
  var hostName = ''
  if(process.env.ENVIRONMENT == 'development') {
    hostName = 'https://app.sandbox.midtrans.com';
  } else if(process.env.ENVIRONMENT == 'production') {
    hostName = 'https://app.midtrans.com';
  }

  // Request Headers
  const accept = 'application/json';
  const contentType = 'application/json';
  const authString = encode.encode(config.MidtransParams.server_key_dev + ':', 'base64');
  const headers = {
    headers: {
      'Accept': accept,
      'Content-Type': contentType,
      'Authorization': 'Basic ' + authString
    }
  }

  return {
    getPaymentToken: (req, res) => {
      console.log(req.body)
      axios.post(hostName + '/snap/v1/transactions', req.body, headers)
        .then((response) => {
          res.send(response.data)
        })
    }
  }

}
