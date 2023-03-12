const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: 'Successfully Logged In',
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: 'Not Authorized' });
  }
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    error: true,
    message: 'Log in failure',
  });
});

//AUTH WITH GOOGLE
router.get(
  '/google/',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

//AUTH WITH CALLBACK
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/login/success',
    failureRedirect: 'http://localhost:3000/login/failed',
  })
);

//logout user
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
