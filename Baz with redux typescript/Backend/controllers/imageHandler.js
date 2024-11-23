const multer = require('multer');
const crypto = require('crypto');
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const storage = (location) =>
  new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `${location} images`,
      allowed_formats: ['avif', 'webp','png'],
      transformation: [{ width: 2500, height: 2500, crop: 'limit' }],
      public_id: (req, file) =>
        `baz_${Date.now()}-${crypto.randomBytes(8).toString('hex')}-${
          file.originalname
        }`,
    },
  });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload an image', 400), false);
  }
};

const cloudUpload = (location) =>
  multer({ storage: storage(location), fileFilter: multerFilter });

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.noUpload = () => upload.none();

exports.uploadPhoto = ([uploadType], type) => {
  if (uploadType && uploadType === 'multerUpload') {
    return upload.single('image');
  }
  return cloudUpload(type).single('image');
};
exports.multiplePhotos = ([entries, uploadType], type) => {
  if (uploadType && uploadType === 'multerUpload') {
    return upload.fields([...entries]);
  }
  return cloudUpload(type).fields([...entries]);
};
exports.multipleSinglePhotos = ([entry, uploadType], type) => {
  if (uploadType && uploadType === 'multerUpload') {
    return upload.array(entry.name, entry.maxCount);
  }
  return cloudUpload(type).array(entry.name, entry.maxCount);
};

exports.resizePhoto = (length, width, name, location) =>
  catchAsync(async (req, res, next) => {
    // console.log(req.file);
    if (!req.file) next();
    const userId = req.user.id;
    const timeStamp = Date.now();

    req.body.images = `${name}-${userId}-${timeStamp}.jpeg`;
    await sharp(req.file.buffer)
      .resize(length, width)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`../../frontend/public/${location}/${req.body.images}`);

    next();
  });

exports.resizeMultiplePhotos = (length, width, name, location) =>
  catchAsync(async (req, res, next) => {
    if (!req.files) next();
    const userId = req.user.id;
    const timeStamp = Date.now();

    req.body.images = [];
    // req.body.images = `${name}-${userId}-${timeStamp}.jpeg`;
    // console.log(req.files);

    await Promise.all(
      req.files.map(async (file, index) => {
        const filename = `${name}-${userId}-${timeStamp}-${index}.jpeg`;
        await sharp(file.buffer)
          .resize(length, width)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`../../frontend/public/${location}/${filename}`);

        req.body.images.push(filename);
      })
    );

    next();
  });

exports.processMultipleImages = async (req, res, next) => {
  if (req.files) {
    const fileImages = req.files.map((image) => image.path);
    if (req.body.images) {
      if (!Array.isArray(req.body.images)) {
        req.body.images = [req.body.images];
      }
      req.body.images = [...req.body.images, ...fileImages];
    } else {
      req.body.images = [...fileImages];
    }
  }
  next();
};
