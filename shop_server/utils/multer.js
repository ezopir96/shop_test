const multer = require('multer')
const path = require('path')


const avatarStorage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, path.resolve(__dirname, 'http://localhost:8080/public/avatar'))
  },
  filename (req, file, cb) {
    console.log('111')
    console.log(req.params)
    const { ext } = path.parse(file.originalname)
    const filename = req.params.avatarName
    console.log('filename', filename)
    req.filename = filename
    cb(null, filename)
  }
})

module.exports = {
  avatarUpload: multer({ storage: avatarStorage })
}
