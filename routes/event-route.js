const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const currentDate = moment().format('YYYY-MM-DD');

// Middleware:check  from signup  التحقق من تسجيل الدخول
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/users/login');
};

// ✅ Show Page New Create 
router.get('/create', isAuthenticated, (req, res) => {
  res.render('event/create', {
    errors: req.flash('errors')
  });
});

// save new event   
router.post('/create',
  [
    check('title').isLength({ min: 5 }).withMessage('Title should be more than 5 characters'),
    check('description').isLength({ min: 5 }).withMessage('Description should be more than 5 characters'),
    check('location').isLength({ min: 3 }).withMessage('Location should be more than 3 characters'),
    check('date').isLength({ min: 5 }).withMessage('Date should be valid')
  ],
  isAuthenticated,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('errors', errors.array());
      return res.redirect('/events/create');
    }

    try {
      const newEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        date: req.body.date,
        user_id: req.user.id,
        create_at: Date.now()
      });

      await newEvent.save();
      req.flash('info', 'The event was created successfully');

      // 👇This Line It Updata Is Important 
      res.redirect('/events');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  })

// ✅ show page update event 
router.get('/edit/:id', isAuthenticated, async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).send('Event not found');

    res.render('event/edit', {
      event,
      eventDate: currentDate,
      errors: req.flash('errors'),
      message: req.flash('info')
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//updata events 
router.post(
  '/update',
  [
    check('title').isLength({ min: 5 }).withMessage('Title should be more than 5 characters'),
    check('description').isLength({ min: 5 }).withMessage('Description should be more than 5 characters'),
    check('location').isLength({ min: 3 }).withMessage('Location should be more than 3 characters'),
    check('date').isLength({ min: 5 }).withMessage('Date should be valid')
  ],
  isAuthenticated,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('errors', errors.array());
      return res.redirect('/events/edit/' + req.body.id);
    }

    try {
      await Event.updateOne(
        { _id: req.body.id },
        {
          title: req.body.title,
          description: req.body.description,
          location: req.body.location,
          date: req.body.date
        }
      );
      req.flash('info', 'The event was updated successfully');
      res.redirect('/events/edit/' + req.body.id);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  }
);

// ✅ deleted event 
router.delete('/delete/:id', isAuthenticated, async (req, res) => {
  try {
    const result = await Event.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      res.status(200).json('Deleted');
    } else {
      res.status(404).json('Event not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('An error occurred. Event was not deleted');
  }
});

// صفحة عرض الأحداث مع الترقيم باستخدام query string
router.get('/', async (req, res, next) => {
  try {
    const pageNo = parseInt(req.query.page) || 1; // أخذ رقم الصفحة من query string
    const limit = 5;
    const skip = (pageNo - 1) * limit;

    //count events  إجمالي عدد الأحداث
    const totalDocs = await Event.countDocuments({});
    const totalPages = Math.ceil(totalDocs / limit);

    //get event for this page  جلب الأحداث لهذه الصفحة
    const events = await Event.find({})
      .skip(skip)
      .limit(limit)
      .lean();

    //show from ship column divide events  
    const chunkSize = 3;
    const chunk = [];
    for (let i = 0; i < events.length; i += chunkSize) {
      chunk.push(events.slice(i, i + chunkSize));
    }

    // shwo the mold 
    res.render("event/index", {
      chunk: chunk,
      currentPage: pageNo,
      totalPages: totalPages,
      message: req.flash('info'),
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("خطأ في تحميل الأحداث");
  }
})

// ✅ show single event
router.get('/show/:id', async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).send('Event not found');
    res.render('event/show', { event });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/', (req, res) => {
  res.redirect('/events/show');
});

module.exports = router;
