const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const { Schema, model, ObjectId } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please tell us your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please tell us your last name'],
    },
    username: {
      type: String,
      required: [true, 'please input your username'],
      validate: {
        validator: function (v) {
          return /^[A-Z][A-Z0-9]*[_]?[A-Z0-9]+$/gim.test(v);
        },
        message: (props) => `${props.value} is not a valid username!`,
      },
    },
    email: {
      type: String,
      required: [true, 'Please tell us your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'please provide a valid email'],
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: [
        true,
        'Please tell us your phone number as it is important for two-step verification',
      ],
      validate: {
        validator: function (v) {
          return /\d{3}\d{3}\d{4}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please tell us your password'],
      unique: true,
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'password are not the same',
      },
    },
    dateCreated: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    followers: [ObjectId],
    following: [ObjectId],
    blocked: [ObjectId],
    bookmarks: [ObjectId],
    tweets: [ObjectId],
    messages: [ObjectId],
    circles: [ObjectId],
    private: { type: Boolean, default: false },
    lists: [],
    notifications: [],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.pre('save', async function (next) {
  //Only run this function if password is modified
  if (!this.isModified('password')) return next();

  // has the password with cost of 12
  this.password = await bcrypt.hash(this.password, 16);
  //set password to undefined
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256', resetToken)
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const user = model('user', userSchema);
module.exports = user;
