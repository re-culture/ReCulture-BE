const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user.id;
    const dir = path.join(__dirname, '../uploads/profile');

    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${req.user.id}.${file.originalname.split('.').pop()}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { files: 1 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg, .jpeg, .gif files are allowed!'));
    }
  },
});

module.exports = upload;