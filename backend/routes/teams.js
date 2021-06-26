const router = require('express').Router()
const TeamController = require('../controllers/teams')
const middlewares = require('../middlewares/auth')

router.post('/create', middlewares.isLoggedIn, async (req, res) => {
  const { teamName } = req.body
  const response = await TeamController.createTeam(req.decoded.id, teamName)
  res.status(response.code).send(response)
})

router.post('/user/add', middlewares.isLoggedIn, async (req, res) => {
  const { userId, teamId } = req.body
  const response = await TeamController.addUser(userId, teamId)
  res.status(response.code).send(response)
})

router.post('/delete', middlewares.isLoggedIn, async (req, res) => {
  const { teamId } = req.body
  const response = await TeamController.removeTeam(req.decoded.id, teamId)
  res.status(response.code).send(response)
})

router.post('/user/delete', middlewares.isLoggedIn, async (req, res) => {
  const { userId, teamId } = req.body
  const response = await TeamController.removeUser(req.decoded.id, userId, teamId)
  res.status(response.code).send(response)
})
module.exports = router
