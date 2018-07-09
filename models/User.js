const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const { Schema } = mongoose

const userSchema = new Schema({
  id: String,
  email: String,
  name: String,
  password: String,
  avatar: String
})

const customerSchema = new Schema({
  id: String,
  email: String,
  bank_account: String,
  phone: String,
  address: [{
    street: String,
    city: String,
    state: String,
    country: String
  }]
})

userSchema.methods.hashPassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

mongoose.model('users', userSchema)
mongoose.model('customers', customerSchema)
