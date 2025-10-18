const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

//saving user object in the session 
passport.serializeUser(function(user , done ){
    done(null , user )
})


// Login 
passport.use('local.signup', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      if (req.body.password !== req.body.confirm_password) {
        return done(null, false, req.flash('error', 'كلمتا السر غير متطابقتين'));
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return done(null, false, req.flash('error', 'البريد الإلكتروني مستخدم مسبقاً'));
      }

      const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.hasPassword(password);
      newUser.avatar = "ProFile.png.png" // يجب أن تكون هذه الدالة موجودة لديك
      await newUser.save();
req.flash('success', 'تم إنشاء الحساب بنجاح');
return done(null, newUser);
    } catch (err) {
      return done(err);
    }
  }
));

// تسجيل الدخول
passport.use('local.login', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, req.flash('error', 'المستخدم غير موجود'));
      }

      const isMatch = user.comparePasswords(password, user.password); // تحقق من الدالة هذه
      if (!isMatch) {
        return done(null, false, req.flash('error', 'كلمة السر غير صحيحة'));
      }

      req.flash('success', 'مرحباً بعودتك!');
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

//Stor and Recovery Users From Session     
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) return done(new Error(' المستخدم غير موجود'));
    done(null, user);
  } catch (err) {
    done(err);
  }
});


