const router = require('express').Router()

router.get('/', (req, res) => {
  res.status(200).json({ health: 'ok' })
})

module.exports = router
