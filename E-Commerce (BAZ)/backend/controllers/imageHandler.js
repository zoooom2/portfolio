const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload an image', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadPhoto = (image) => upload.single(image);

exports.multiplePhotos = (entries) => upload.fields([...entries]);
exports.multipleSinglePhotos = (entry) =>
  upload.array(entry.name, entry.maxCount);

exports.resizePhoto = (length, width, name, location) =>
  catchAsync(async (req, res, next) => {
    console.log(req.file);
    if (!req.file) next();
    const userId = req.user.id;
    const timeStamp = Date.now();

    req.body.images = `${name}-${userId}-${timeStamp}.jpeg`;
    await sharp(req.file.buffer)
      .resize(length, width)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`./public/img/${location}/${req.body.images}`);

    next();
  });

exports.resizeMultiplePhotos = (length, width, name, location) =>
  catchAsync(async (req, res, next) => {
    if (!req.files) next();
    const userId = req.user.id;
    const timeStamp = Date.now();

    req.body.images = [];
    // req.body.images = `${name}-${userId}-${timeStamp}.jpeg`;
    console.log(req.files);
    await Promise.all(
      req.files.map(async (file, index) => {
        const filename = `${name}-${userId}-${timeStamp}-${index}.jpeg`;
        await sharp(file.buffer)
          .resize(length, width)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`./public/img/${location}/${filename}`);

        req.body.images.push(filename);
      })
    );

    next();
  });
