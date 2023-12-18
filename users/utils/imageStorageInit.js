const multer = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '../images/profilePics');
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
	},
});

const multerUpload = multer({
	storage: imageStorage,
});

module.exports = multerUpload;
