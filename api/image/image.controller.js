const imageService = require('./image.service.js')

const logger = require('../../services/logger.service')

async function getImages(req, res) {
  try {
    logger.debug('Getting Images')
    // const filterBy = {
    //   txt: req.query.txt || ''
    // }
    const images = await imageService.query()
    res.json(images)
  } catch (err) {
    logger.error('Failed to get images', err)
    res.status(500).send({ err: 'Failed to get images' })
  }
}

async function getImageById(req, res) {
  try {
    const imageId = req.params.id
    const image = await imageService.getById(imageId)
    res.json(image)
  } catch (err) {
    logger.error('Failed to get image', err)
    res.status(500).send({ err: 'Failed to get image' })
  }
}

async function addImage(req, res) {
  // const { loggedinUser } = req

  try {
    const image = req.body
    // image.owner = loggedinUser
    const addedImage = await imageService.add(image)
    console.log(addedImage)
    res.json(addedImage)
  } catch (err) {
    logger.error('Failed to add image', err)
    res.status(500).send({ err: 'Failed to add image' })
  }
}


async function updateImage(req, res) {
  try {
    const image = req.body
    const updatedImage = await imageService.update(image)
    res.json(updatedImage)
  } catch (err) {
    logger.error('Failed to update image', err)
    res.status(500).send({ err: 'Failed to update image' })

  }
}

async function removeImage(req, res) {
  try {
    const imageId = req.params.id
    const removedId = await imageService.remove(imageId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove image', err)
    res.status(500).send({ err: 'Failed to remove image' })
  }
}

async function addImageMsg(req, res) {
  const { loggedinUser } = req
  try {
    const imageId = req.params.id
    const msg = {
      txt: req.body.txt,
      by: loggedinUser
    }
    const savedMsg = await imageService.addImageMsg(imageId, msg)
    res.json(savedMsg)
  } catch (err) {
    logger.error('Failed to update image', err)
    res.status(500).send({ err: 'Failed to update image' })

  }
}

async function removeImageMsg(req, res) {
  const { loggedinUser } = req
  try {
    const imageId = req.params.id
    const { msgId } = req.params

    const removedId = await imageService.removeImageMsg(imageId, msgId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove image msg', err)
    res.status(500).send({ err: 'Failed to remove image msg' })

  }
}

module.exports = {
  getImages,
  getImageById,
  addImage,
  updateImage,
  removeImage,
  addImageMsg,
  removeImageMsg
}
