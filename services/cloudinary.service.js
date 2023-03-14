const cloudinary = require('cloudinary').v2;
cloudinary.config({ api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_SECRET, cloud_name: process.env.CLOUDINARY_NAME })

const CLOUDINARY_FOLDER = 'image-uploader/'

async function removeFromCloudinary(url) {
    const public_id = url.split(CLOUDINARY_FOLDER)[1].split('.')[0]
    const res = await cloudinary.uploader.destroy(CLOUDINARY_FOLDER + public_id).then(result => result.result)
    if (res === 'not found') throw new Error('image not found in cloudinary')
}


module.exports = {
    removeFromCloudinary
}