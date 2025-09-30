const express = require('express');
const app = express();
const events = require('./routes/event-route');
const users = require('./routes/user-route');
const database = require('./config/database');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');

// steting for views 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// بارس للبيانات
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// الملفات الثابتة
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('node_modules'));

// إعداد السيشن والفلاش
app.use(session({
  secret: 'lorem ipsum',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use(flash());
// app.use((req, res, next) => {
//   res.locals.success = req.flash('success');
//   res.locals.error = req.flash('error');
//   res.locals.message = req.flash('message');
//   res.locals.errors = req.flash('errors');
//   next();
// });
//bring passport 
app.use(passport.initialize());
app.use(passport.session());
// store user object 
app.use(async (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
// files router 
app.use('/events', events);
app.use('/users', users);

// main router 
app.get('/', (req, res) => {
  res.redirect('/events');
});

// تشغيل الخادم
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});