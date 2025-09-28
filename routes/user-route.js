const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const multer = require('multer');
// configure mulater 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9  )
    cb(null, file.fieldname + '-' + uniqueSuffix + '.png') 
  }
})

const upload = multer({ storage: storage })
//middleware to check if user is logged 
isAuthenticated = (req , res , next )=> {
    if (req.isAuthenticated()){
        return next();
    }else{
        res.redirect('users/login')
    }
}
//login user view 
router.get('/login', async (req , res , next )=> {
    res.render('user/login' ,{
        error: req.flash('error')
    })
})

//login post request 
router.post('/login', (req, res, next) => {
  passport.authenticate('local.login', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/users/login');

    req.logIn(user, (err) => {
      if (err) return next(err);

      req.flash('success', 'مرحباً بعودتك!');
      return res.redirect('/users/profile');
    });
  })(req, res, next);
});


//sign up from 
router.get('/signup', async (req , res , next )=> {
    res.render('user/signup' , {
        error: req.flash('error')
    })
})

//sign up post request 
router.post('/signup', (req, res, next) => {
  passport.authenticate('local.signup', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/users/signup');

    // تسجيل الدخول بعد إنشاء المستخدم
    req.logIn(user, (err) => {
      if (err) return next(err);
      req.flash('success', 'تم إنشاء الحساب بنجاح');
      return res.redirect('/users/profile');
    });
  })(req, res, next);
});

//Profile  up from 
router.get('/profile',isAuthenticated ,async (req, res, next) => {
    
 res.render('user/profile',{
    success : req.flash('success')
 } )
    
  
});
//uploads user avatar 
router.post('/uploadAvatar', upload.single('avatar'), (req, res) => {
  let newFiled = {
    avatar: req.file.filename
  };

  User.updateOne({ _id: req.user._id }, newFiled)
    .then(() => {
      res.redirect('/users/profile');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error uploading avatar');
    });
});

//Logout  up from 
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err); // مرر الخطأ إذا حصل مشكلة أثناء الخروج
    }
    req.flash('success', 'تم تسجيل الخروج بنجاح');
    res.redirect('/users/login'); // عد إلى صفحة تسجيل الدخول
  });
});

module.exports = router ;