const multer = require('multer');


const diskStorage = multer.diskStorage({
    destination: "public/upload",
    filename: (req, file, cb) => {
        const prefix = Date.now() + '-' + Math.round(Math.random() * 1 );

        cb(null, prefix + "-" + file.originalname);
    }
})

const filter = (req, file, cb) => {
    
    if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer ({
    storage: diskStorage,
    fileFilter: filter,
})

module.exports = upload