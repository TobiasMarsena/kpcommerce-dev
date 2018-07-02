const axios = require('axios')

module.exports = () => {
    //Request url
    const url = 'https://api.instagram.com/v1'

    return {
        //Returns yourself profile data
        getYourself: (req, res) => {
            const access_token = req.user.access_token
            axios.get(`${url}/users/self/?access_token=${access_token}`, {})
              .then((response) => {
                res.send(response.data)
              }).catch(error => console.log("Error getYourself: ", error))
        },
        //Returns yourself media
        getYourselfMedia: (req, res) => {
            const access_token = req.user.access_token
            axios.get(`${url}/users/self/media/recent/?access_token=${access_token}`, {})
              .then((response) => {
                res.send(response.data)
            }).catch(error => console.log("Error getYourselfMedia: ", error))
        }
    }
}
