const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const articleRouter = require('./routes/articleRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

// Start express app
const app = express();

app.enable('trust proxy');

// 1) GLOBAL MIDDLEWARES

// Implement CORS
app.use(
  cors({
    origin: [ 'https://www.jamfoundation.org.ng','https://jamfoundation.org.ng','http://localhost:5173', 'https://jamfoundation.vercel.app', ],
    methods: 'GET,POST,PATCH,DELETE',
    credentials: true,
  }),
);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
app.use(
  session({
    secret: 'keyboard time',
    crypto: { secret: 'keyboard cat' },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: DB,
      ttl: 1 * 1 * 60 * 60, //1 hour
      autoRemove: 'interval',
      autoRemoveInterval: 10, //minute
      touchAfter: 24 * 3600, //24 hours
    }),
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 360000,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.options('*', cors());
// app.options('/api/v1/tours/:id', cors());

// Serving static files
app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }),
);

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 1500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  }),
);

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.session);
  next();
});

/// 3) ROUTES
app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
