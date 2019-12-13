const express = require('express')

const User = require('../models/User')

const router = express.Router()

router.post('/register', async (req, res) => {

  const { email, username } = req.body

  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'Sorry, this email was already chosen. Please choose another one!' })
    if (await User.findOne({ username }))
      return res.status(400).send({ error: 'Sorry, this username was already chosen. Please choose another one!' })

    const user = await User.create(req.body)

    user.password = undefined

    return res.send({ user })
  } catch (err) {
    return res.status(400).send({ error: 'Oops... there was an error with your registration!' })
  }
})

module.exports = app => app.use('/auth', router)