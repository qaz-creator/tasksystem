const router = require('express').Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')
const Task = require('../models/task')

router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
    res.json(tasks)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.post(
  '/',
  auth,
  [
    check('name', 'Please provide the task name').not().isEmpty(),
    // check('phone', 'Please provide the phone').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() })
    }
    const { name, detail, level, iscompleted } = req.body

    try {
      const newTask = new Task({
        user: req.user.id,
        name,
        detail,
        level,
        iscompleted,
      })
      const task = await newTask.save()
      res.json(task)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
    }
  },
)

router.delete('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({
        msg: 'Task not found',
      })
    }
    await Task.findByIdAndRemove(req.params.id)
    res.send('Task removed')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.put('/:id', auth, async (req, res) => {
  const { name, detail, level, iscompleted } = req.body
  const TaskFields = { name, detail, level, iscompleted }
  try {
    let task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' })
    }
    // req.user.id is from auth(the middleware)
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorised' })
    }
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: TaskFields },
      { new: true },
    )
    res.send(task)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
