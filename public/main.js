import { imageService } from './services/image.service.local.js'
import { userService } from './services/user.service.js'
import { utilService } from './services/util.service.js'

console.log('Simple driver to test some API calls')

window.onLoadImages = onLoadImages
window.onLoadUsers = onLoadUsers
window.onAddImage = onAddImage
window.onGetImageById = onGetImageById
window.onRemoveImage = onRemoveImage
window.onAddImageMsg = onAddImageMsg

async function onLoadImages() {
    const images = await imageService.query()
    render('Images', images)
}
async function onLoadUsers() {
    const users = await userService.query()
    render('Users', users)
}

async function onGetImageById() {
    const id = prompt('Image id?')
    if (!id) return
    const image = await imageService.getById(id)
    render('Image', image)
}

async function onRemoveImage() {
    const id = prompt('Image id?')
    if (!id) return
    await imageService.remove(id)
    render('Removed Image')
}

async function onAddImage() {
    await userService.login({ username: 'muki', password: '123' })
    const savedImage = await imageService.save(imageService.getEmptyImage())
    render('Saved Image', savedImage)
}

async function onAddImageMsg() {
    await userService.login({ username: 'muki', password: '123' })
    const id = prompt('Image id?')
    if (!id) return

    const savedMsg = await imageService.addImageMsg(id, 'some msg')
    render('Saved Msg', savedMsg)
}

function render(title, mix = '') {
    console.log(title, mix)
    const output = utilService.prettyJSON(mix)
    document.querySelector('h2').innerText = title
    document.querySelector('pre').innerHTML = output
}

