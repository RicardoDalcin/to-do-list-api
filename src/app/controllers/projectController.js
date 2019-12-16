const express = require('express')
const authMiddleware = require('../middlewares/auth')
const Project = require('../models/project')
const Task = require('../models/task')

const router = express.Router()

router.use(authMiddleware)

router.get('/', async (req, res) => {
  try{
    const projects = await Project.find({ user: req.userId })
    return res.send({ projects })
  } catch (err) {
    return res.status(400).send({ error: 'An error ocurred trying to fetch projects, please try again later!' })
  }
})

router.get('/:projectId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
    return res.send({ project })
  } catch (err) {
    return res.status(400).send({ error: 'An error ocurred trying to find projects, please try again later!'})
  }
})

router.post('/', async (req, res) => {
  try{
    const project = await Project.create({...req.body, user: req.userId})

    return res.send(project)
  } catch (err) {
    return res.status(400).send({ error: 'An error ocurred creating a new project, please try again later!'})
  }
})

router.put('/:projectId', async (req, res) => {
  return res.send({ ok: true })
})

router.delete('/:projectId', async (req, res) => {
  return res.send({ ok: true })
})

module.exports = app => app.use('/projects', router)