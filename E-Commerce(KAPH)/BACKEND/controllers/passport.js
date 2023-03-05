const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const mongoose = require('mongoose');
const GoogleUser = require('../models/passportUserModel');

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/v1/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, cb) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          let user = await GoogleUser.findOne({ googleId: profile.id });
          console.log(newUser);
          if (!user) {
            user = await GoogleUser.create(newUser);
          }
          cb(null, user);
        } catch (error) {
          console.error(error);
        }
      }
    )
  );

  passport.serializeUser((user, cb) => {
    process.nextTick(() =>
      cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture,
      })
    );
  });

  passport.deserializeUser((user, cb) => {
    process.nextTick(() => cb(null, user));
  });
};
