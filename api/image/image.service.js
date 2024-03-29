const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId
const cloudinaryService = require('../../services/cloudinary.service')

async function query() {
    try {
        // const criteria = {
        //     vendor: { $regex: filterBy.txt, $options: 'i' }
        // }
        const collection = await dbService.getCollection('image')
        var images = await collection.find().toArray()
        return images
    } catch (err) {
        logger.error('cannot find images', err)
        throw err
    }
}

async function add(url) {
    const newImage = { url, addedAt: Date.now() }
    try {
        const collection = await dbService.getCollection('image')
        const length = await collection.countDocuments()
        if (length > 12) throw new Error('Gallery is limited to 12 images')
        const res = await collection.insertOne(newImage)
        return res
    } catch (err) {
        logger.error('cannot insert image', err)
        throw err
    }
}

async function getById(imageId) {
    try {
        const collection = await dbService.getCollection('image')
        const image = collection.findOne({ _id: ObjectId(imageId) })
        return image
    } catch (err) {
        logger.error(`while finding image ${imageId}`, err)
        throw err
    }
}

async function remove(imageId) {
    if (!imageId) throw new Error('imageId not found')
    try {
        const collection = await dbService.getCollection('image')
        const image = await collection.findOne({ _id: ObjectId(imageId) })
        if (!collection) throw new Error('imageId not found')
        if (!image) throw new Error('image not found')
        if (image.url.includes('https://res.cloudinary.com/defz7xcxw/image/upload')) {
            await cloudinaryService.removeFromCloudinary(image.url)
        }
        await collection.deleteOne({ _id: ObjectId(imageId) })
        return imageId
    } catch (err) {
        logger.error(`cannot remove image ${imageId}`, err)
        throw err
    }
}



async function update(image) {
    try {
        const imageToSave = {
            vendor: image.vendor,
            price: image.price
        }
        const collection = await dbService.getCollection('image')
        await collection.updateOne({ _id: ObjectId(image._id) }, { $set: imageToSave })
        return image
    } catch (err) {
        logger.error(`cannot update image ${imageId}`, err)
        throw err
    }
}

async function addImageMsg(imageId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('image')
        await collection.updateOne({ _id: ObjectId(imageId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add image msg ${imageId}`, err)
        throw err
    }
}

async function removeImageMsg(imageId, msgId) {
    try {
        const collection = await dbService.getCollection('image')
        await collection.updateOne({ _id: ObjectId(imageId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add image msg ${imageId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addImageMsg,
    removeImageMsg
}
