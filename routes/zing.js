const express = require('express')
const router = express.Router()
const zingController = require('../controller/zingController')

router.get('/home', zingController.getHome)
router.get('/playlist', zingController.getPlayList)
router.get('/top-100', zingController.getTop100)
router.get('/song', zingController.getSong)
router.get('/search', zingController.getSearch)
module.exports = router