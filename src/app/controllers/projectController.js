const express = require('express')
const authMiddleware = require('../middlewares/auth')
const Project = require('../models/project')

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
    return res.status(400).send({ error: 'An error ocurred trying to find project, please try again later!'})
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
  try {
    const project = await Project.findByIdAndUpdate(req.params.projectId, {...req.body}, { new: true })
    return res.send({ project })
  } catch (err) {
    return res.status(400).send({ error: 'An error ocurred trying to edit project, please try again later!'})
  }
})

router.delete('/:projectId', async (req, res) => {
  try {
    await Project.findByIdAndRemove(req.params.projectId)
    return res.send({ message: 'Project was successfully deleted!' })
  } catch (err) {
    return res.status(400).send({ error: 'An error ocurred trying to delete project, please try again later!'})
  }
})

module.exports = app => app.use('/projects', router)