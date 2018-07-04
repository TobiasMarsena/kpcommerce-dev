const app = require('express')();
const session = require('express-session');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3333;
require('./models/User')
require('./services/passport')

const config = require('./config/config')

// DATABASE
mongoose.connect(config.MongoParams.mongo_uri)

// MIDDLEWARES
app.use(session({ secret: 'somesecret' }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
process.env.ENVIRONMENT = 'development'

// ROUTES
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);

/*
* RUN SERVER
*/
app.listen(port, () => console.log(`Running at port ${port}`))
