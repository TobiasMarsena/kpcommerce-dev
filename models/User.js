const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  password: String,
  image: String
})

userSchema.methods.hashPassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

mongoose.model('users', userSchema)
