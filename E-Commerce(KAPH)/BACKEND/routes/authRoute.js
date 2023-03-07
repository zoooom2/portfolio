const express = require('express');
const passport = require('passport');

const router = express.Router();
//AUTH WITH GOOGLE
router.get(
  '/',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

//AUTH WITH CALLBACK
router.get(
  '/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:2705/api/v1/google',
  }),
  (req, res) => {
    // console.log(req.isAuthenticated());
    res.redirect('http://localhost:3000');
  }
);

//logout user
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
