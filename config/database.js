const mongoose = require('mongoose');

// Conntedcted Be DataBase 
mongoose.connect('mongodb://localhost:27017/eventsDB', {

 
})
.then(() => console.log('✅ Connected to DB By Eng : Abdulmalekk ...'))
.catch(err => console.error('❌ DB Connection Error:', err));