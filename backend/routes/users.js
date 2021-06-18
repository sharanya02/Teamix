const router = require('express').Router()
const UserController = require('../controllers/users')

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body
  const response = await UserController.signup(email, password, username)
  res.status(response.code).send(response)
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const response = await UserController.login(email, password)
  res.status(response.code).send(response)
})
module.exports = router
