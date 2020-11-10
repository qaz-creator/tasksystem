const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// user model
const User = require('../models/user')
const { JWT_SECRET } = require('../config/keys')

router.post(
  '/',
  [
    check('name', 'Please provide a name').not().isEmpty(),
    check('email', 'Please provide an email').isEmail(),
    check('password', 'Password at least 6 character long').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() })
    }
    const { name, email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ msg: 'user already exists' })
      }
      user = new User({
        name,
        email,
        password,
      })
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()

      //   give a token
      const payload = {
        user: { id: user.id },
      }
      jwt.sign(
        payload,
        JWT_SECRET,
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err
          res.send({ token })
        },
      )
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
    }
  },
)

module.exports = router
