// const express = require('express');
// const app = express();
// const events = require('./routes/event-route');
// const users = require('./routes/user-route');
// const database = require('./config/database');
// const session = require('express-session');
// const flash = require('connect-flash');
// const passport = require('passport');
// const passportSetup = require('./config/passport-setup');

// // setting For Views 
// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');

// // PARS For Data 
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // static Folders   
// app.use(express.static('public'));
// app.use(express.static('uploads'));
// app.use(express.static('node_modules'));

// // settings session and falsh
// app.use(session({
//   secret: 'lorem ipsum',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false }
// }));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
// //The  Store user Is  Object 
// app.use(async (req, res, next) => {
//   res.locals.user = req.user || null;
//   next();
// });
// //The  Files router 
// app.use('/events', events);

// // main router for get all events 
// app.get('/', (req, res) => {
//   res.redirect('/events');
// });

// // Run Server 
// app.listen(3000, () => {
//   console.log('Server is listening on port 3000');
// });


require('dotenv').config(); // 🔥 مهم جدًا

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const events = require('./routes/event-route');
const users = require('./routes/user-route');

const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./config/passport-setup');

// =======================
// Middlewares
// =======================

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use(express.static('uploads'));

app.use(session({
  secret: 'lorem ipsum',
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// =======================
// Routes
// =======================

app.use('/events', events);

app.get('/', (req, res) => {
  res.redirect('/events');
});

// =======================
// Database + Server
// =======================

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    app.listen(process.env.PORT || 3000, () => {
      console.log('🚀 Server running');
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
  });
