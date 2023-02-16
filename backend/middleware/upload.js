const multer = require('multer');
const fs = require('fs');
const path = require('path');

function getFileName({ destination, originalname }) {
  let newPath = path.join(destination, originalname);
  const { name, ext } = path.parse(originalname);
  for (let i = 0; fs.existsSync(checkPath); i++) {
    newPath = path.join(destination, `${name} - (${i})${ext}`);
  }

  return newPath;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, process.env.UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, getFileName(file)),
});

const upload = multer({ storage });
module.exports = upload;
