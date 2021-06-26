const router = require('express').Router()
const PostController = require('../controllers/posts')
const middlewares = require('../middlewares/auth')

router.post('/create', middlewares.isLoggedIn, async (req, res) => {
  const { teamId, postContent } = req.body
  const response = await PostController.createPost(req.decoded.id, teamId, postContent)
  res.status(response.code).send(response)
})

router.post('/like', middlewares.isLoggedIn, async (req, res) => {
  const { postId, increment } = req.body
  const response = await PostController.createPost(postId, increment)
  res.status(response.code).send(response)
})

router.post('/delete', middlewares.isLoggedIn, async (req, res) => {
  const { postId } = req.body
  const response = await PostController.deletePost(req.decoded.id, postId)
  res.status(response.code).send(response)
})

module.exports = router
