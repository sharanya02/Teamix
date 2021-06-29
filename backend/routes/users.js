const router = require('express').Router()
const UserController = require('../controllers/users')
const middlewares = require('../middlewares/auth')

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

router.post('/details/fetch', middlewares.isLoggedIn, async (req, res) => {
  const response = await UserController.fetchUser(req.decoded.id)
  res.status(response.code).send(response)
})

module.exports = router
