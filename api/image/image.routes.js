const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getImages, getImageById, addImage, updateImage, removeImage, addImageMsg, removeImageMsg } = require('./image.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getImages)
// router.get('/:id', getImageById)
router.post('/', addImage)
// router.put('/:id', requireAuth, updateImage)
// router.delete('/:id', requireAuth, removeImage)
// // router.delete('/:id', requireAuth, requireAdmin, removeImage)

// router.post('/:id/msg', requireAuth, addImageMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeImageMsg)

module.exports = router