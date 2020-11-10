const mongoose = require('mongoose')
const auth = require('../middleware/auth')

const guestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    // users is the collection of user
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dietary: {
    type: String,
    default: 'Non-Veg',
  },
  isconfirmed: {
    type: Boolean,
    default: false,
  },
})


module.exports = mongoose.model('guest', guestSchema)
