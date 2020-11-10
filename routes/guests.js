const router = require('express').Router()
const auth = require('../middleware/auth')
const Guest = require('../models/guest')
const { check, validationResult } = require('express-validator')

router.get('/', auth, async (req, res) => {
  try {
    const guests = await Guest.find({ user: req.user.id })
    res.json(guests)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.post(
  '/',
  auth,
  [
    check('name', 'Please provide the name').not().isEmpty(),
    check('phone', 'Please provide the phone').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() })
    }
    const { name, phone, dietary, isconfirmed } = req.body

    try {
      const newGuest = new Guest({
        user: req.user.id,
        name,
        phone,
        dietary,
        isconfirmed,
      })
      const guest = await newGuest.save()

      res.json(guest)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
    }
  },
)

router.delete('/:id', auth, async (req, res) => {
  try {
    let guest = await Guest.findById(req.params.id)
    if (!guest) {
      return res.status(404).json({
        msg: 'Guest not found',
      })
    }
    await Guest.findByIdAndRemove(req.params.id)
    res.send('Guest removed')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.put('/:id', auth, async (req, res) => {
  const { name, phone, dietary, isconfirmed } = req.body
  const guestFields = { name, phone, dietary, isconfirmed }
  try {
    let guest = await Guest.findById(req.params.id)
    if (!guest) {
      return res.status(404).json({ msg: 'Guest not found' })
    }
    if (guest.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorised' })
    }
    guest = await Guest.findByIdAndUpdate(
      req.params.id,
      { $set: guestFields },
      { new: true },
    )
    res.send(guest)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
