
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
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
    return httpService.get(STORAGE_KEY, filterBy)

    // var images = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     images = images.filter(image => regex.test(image.vendor) || regex.test(image.description))
    // }
    // if (filterBy.price) {
    //     images = images.filter(image => image.price <= filterBy.price)
    // }
    // return images

}
function getById(imageId) {
    // return storageService.get(STORAGE_KEY, imageId)
    return httpService.get(`image/${imageId}`)
}

async function remove(imageId) {
    // await storageService.remove(STORAGE_KEY, imageId)
    return httpService.delete(`image/${imageId}`)
}
async function save(image) {
    var savedImage
    if (image._id) {
        // savedImage = await storageService.put(STORAGE_KEY, image)
        savedImage = await httpService.put(`image/${image._id}`, image)

    } else {
        // Later, owner is set by the backend
        // image.owner = userService.getLoggedinUser()
        // savedImage = await storageService.post(STORAGE_KEY, image)
        savedImage = await httpService.post('image', image)
    }
    return savedImage
}

async function addImageMsg(imageId, txt) {
    // const image = await getById(imageId)
    // if (!image.msgs) image.msgs = []

    // const msg = {
    //     id: utilService.makeId(),
    //     by: userService.getLoggedinUser(),
    //     txt
    // }
    // image.msgs.push(msg)
    // await storageService.put(STORAGE_KEY, image)    
    const savedMsg = await httpService.post(`image/${imageId}/msg`, { txt })
    return savedMsg
}


function getEmptyImage() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





