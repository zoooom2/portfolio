const express = require('express');
const passport = require('passport');

const router = express.Router();
//AUTH WITH GOOGLE
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

//AUTH WITH CALLBACK
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:2705/api/v1/google',
  }),
  (req, res) => res.redirect('http://localhost:3000')
);

//logout user
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
