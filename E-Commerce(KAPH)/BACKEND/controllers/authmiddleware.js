const catchAsync = require('../utils/catchAsync');

exports.ensureAuth = catchAsync(async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
});

exports.ensureGuest = catchAsync(async (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
});
