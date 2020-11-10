const router = require('express').Router()
const Guest = require('../models/guest')

router.get('/', async (req, res) => {
  try {
    const guests = await Guest.find()
    res.json(guests)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})


module.exports = router
