const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

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

router.post('/authenticate', async (req, res) => {
  const { login, password } = req.body

  const user = await User.findOne({ $or: [{ 'email': login }, { 'username': login }] }).select('+password')

  if (!user)
    return res.status(400).send({ error: 'Oops... user was not found!' })

  if (!await bcrypt.compare(password, user.password))
    return res.status(401).send({ error: 'The username or pasword provided is invalid!' })

  user.password = undefined

  const token = jwt.sign({ id: user.id }, authConfig.secret, {
    expiresIn: 86400
  })

  res.send({ token })

})

module.exports = app => app.use('/auth', router)