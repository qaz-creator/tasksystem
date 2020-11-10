const mongoose = require('mongoose')
const auth = require('../middleware/auth')

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    // users is the collection of user
  },
  name: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    // required: true,
  },
  level: {
    type: String,
    default: 'Normal',
  },
  iscompleted: {
    type: Boolean,
    default: false,
  },
})


module.exports = mongoose.model('task', taskSchema)
