const express = require('express')
const router = require('./routes/register')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const { MONGOURI } = require('./config/keys')

// parse file
app.use(express.json({ extended: true }))

// route
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.use('/all', require('./routes/all'))
app.use('/register', router)
app.use('/auth', require('./routes/auth'))
app.use('/tasks', require('./routes/tasks'))

mongoose.connect(MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
mongoose.connection.on('connected', () => {
  console.log('Connected to mongoDB')
})
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to mongoDB', err)
})

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
