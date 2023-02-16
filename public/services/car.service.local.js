
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'image'

export const imageService = {
    query,
    getById,
    save,
    remove,
    getEmptyImage,
    addImageMsg
}
window.cs = imageService


async function query(filterBy = { txt: '', price: 0 }) {
    var images = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        images = images.filter(image => regex.test(image.vendor) || regex.test(image.description))
    }
    if (filterBy.price) {
        images = images.filter(image => image.price <= filterBy.price)
    }
    return images
}

function getById(imageId) {
    return storageService.get(STORAGE_KEY, imageId)
}

async function remove(imageId) {
    await storageService.remove(STORAGE_KEY, imageId)
}

async function save(image) {
    var savedImage
    if (image._id) {
        savedImage = await storageService.put(STORAGE_KEY, image)
    } else {
        // Later, owner is set by the backend
        image.owner = userService.getLoggedinUser()
        savedImage = await storageService.post(STORAGE_KEY, image)
    }
    return savedImage
}

async function addImageMsg(imageId, txt) {
    // Later, this is all done by the backend
    const image = await getById(imageId)
    if (!image.msgs) image.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    image.msgs.push(msg)
    await storageService.put(STORAGE_KEY, image)

    return msg
}

function getEmptyImage() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




