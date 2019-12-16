const express = require('express')
const authMiddleware = require('../middlewares/auth')
const Task = require('../models/task')

const router = express.Router()

router.use(authMiddleware)

router.get('/fetch/:projectId', async (req, res) => {
  try{
    const tasks = await Task.find({ user: req.userId, project: req.params.projectId })
    return res.send({ tasks })
  } catch (err) {
    return res.status(400).send({ error: 'An error ocurred trying to fetch tasks, please try again later!' })
  }
})

router.get('/:taskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId)
    return res.send({ task })
  } catch (err) {
    return res.status(400).send({ error: 'An error ocurred trying to find task, please try again later!'})
  }
})

router.post('/:projectId', async (req, res) => {
  try{
    const task = await Task.create({...req.body, user: req.userId, project: req.params.projectId})

    return res.send(task)
  } catch (err) {
    return res.status(400).send({ error: 'An error ocurred creating a new task, please try again later!'})
  }
})

router.put('/:taskId', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, {...req.body}, { new: true })
    return res.send({ task })
  } catch (err) {
    return res.status(400).send({ error: 'An error ocurred trying to edit task, please try again later!'})
  }
})

router.delete('/:taskId', async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.params.taskId)
    return res.send({ message: 'Task was successfully deleted!' })
  } catch (err) {
    return res.status(400).send({ error: 'An error ocurred trying to delete task, please try again later!'})
  }
})

module.exports = app => app.use('/tasks', router)