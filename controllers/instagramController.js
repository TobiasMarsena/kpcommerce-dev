const axios = require('axios')

module.exports = () => {
    //Request url
    const url = 'https://api.instagram.com/v1'

    return {
        //Returns yourself profile data
        getYourself: async (req, res) => {
            const access_token = req.user.access_token
            const response = await axios.get(`${url}/users/self/?access_token=${access_token}`, {})
            res.send(response.data)
        },
        //Returns yourself media
        getYourselfMedia: async (req, res) => {
            const access_token = req.user.access_token
            const response = await axios.get(`${url}/users/self/media/recent/?access_token=${access_token}`, {})
            res.send(response.data)
        }
    }
}
