const InstagramParams = {
    client_id: '9bd9614dcb7a4d6086d70c31fc03aee1',
    client_secret: 'f669b808f7584fb1aa05ba39824e8a41',
    redirect_uri: 'http://localhost:3333/auth/instagram/callback/'
}
const GoogleParams = {
    client_id: '485196142223-6ij2dgvblmphmt2mbgiogp4h6u1n0coj.apps.googleusercontent.com',
    client_secret: 'OlXYk-2myQkDhsWKpijD4Yg4',
    redirect_uri: 'http://localhost:3333/auth/google/callback',
    project_id: 'kpcommerce-dev',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://accounts.google.com/o/oauth2/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    javascript_origins:'http://localhost:3333'
}
const MongoParams = {
    mongo_uri: 'mongodb://Tobias:Tobiyaias13@ds251240.mlab.com:51240/kpcommerce-dev'
}
const MidtransParams = {
    server_key_dev: 'SB-Mid-server-weGz_K4JOP5NJeCbUWLLvaUB',
    client_key_dev: 'SB-Mid-client-bL_XMR0BUvaqYG98'
}
exports.InstagramParams = InstagramParams
exports.GoogleParams = GoogleParams
exports.MongoParams = MongoParams
exports.MidtransParams = MidtransParams
