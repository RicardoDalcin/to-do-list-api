const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const mailer = require('../../modules/mailer')

const authConfig = require('../../config/auth.json')

const User = require('../models/User')

const router = express.Router()

const generateToken = (params = {}) => {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  })
}

router.post('/register', async (req, res) => {

  const { email, username } = req.body

  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'Sorry, this email was already chosen. Please choose another one!' })
    if (await User.findOne({ username }))
      return res.status(400).send({ error: 'Sorry, this username was already chosen. Please choose another one!' })

    const user = await User.create(req.body)

    user.password = undefined

    return res.send({
      user,
      token: generateToken({ id: user.id })
    })
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

  res.send({ token: generateToken({ id: user.id }) })

})

router.post('/forgot-password', async (req, res) => {
  const { login } = req.body

  try {
    const user = await User.findOne({ $or: [{ 'email': login }, { 'username': login }] })

    if (!user)
      return res.status(400).send({ error: 'Oops... user was not found!' })

    const token = crypto.randomBytes(20).toString('hex')

    const now = new Date()
    now.setHours(now.getHours() + 1)

    await User.findByIdAndUpdate(user.id, {
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: now
      }
    })

    mailer.sendMail({
      to: user.email,
      from: 'rikyhd@gmail.com',
      template: '/forgot_password',
      context: { token }
    }, (err) => {
      if (err) {
        console.log(err)
        return res.status(400).send({ error: 'An error ocurred trying to send password recovery email!' })
      }


      return res.send({ message: 'Password recovery email was submited!' })
    })

  } catch (err) {
    console.log(err)
    res.status(400).send({ error: 'An error ocurred, please try again!' })
  }
})

module.exports = app => app.use('/auth', router)