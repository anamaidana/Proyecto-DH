const multer = require('multer');
const path = require('path');

/* Indicamos para subir el archivo nombre y donde guardarlo */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const folder = './public/images/users';
    cb(null, folder);
  },
  filename(req, file, cb) {
    const imageName = `avatar-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, imageName);
  },
});

const upload = multer({ storage });

module.exports = upload;
