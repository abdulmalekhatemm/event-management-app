const mongoose = require('mongoose');

// الاتصال بقاعدة البيانات
mongoose.connect('mongodb://localhost:27017/eventsDB', {

 
})
.then(() => console.log('✅ Connected to DB By Eng : Abdulmalekk ...'))
.catch(err => console.error('❌ DB Connection Error:', err));