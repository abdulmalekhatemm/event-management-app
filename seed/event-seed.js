const db = require('../config/database');
// const Event = require('../models/Evet');
const Event = require("../models/Event");

let newEvent = [ new Event ({
   
    title: 'Beach Cleaning At Muscat',
    description :'This EvenT Abboud And Anhar Best In World ' ,
    location :'sana' ,
    date : Date.now(),
    create_at : Date.now(),
    }),
     new Event ({
    title: 'Beach Cleaning At Oman',
    description :'This EvenT Abboud And AnLarger In World ' ,
    location :'Taiz' ,
    date : Date.now(),
    create_at : Date.now(),
    }),
     new Event ({
    title: 'Beach Cleaning At Sanana',
    description :'This EvenT Abboud And An Middle In World ' ,
    location :'IBB' ,
    date : Date.now(),
    create_at : Date.now(),
    }),
     new Event ({
    title: 'Beach Cleaning At Taiz',
    description :'This EvenT Abboud And An Small In World ' ,
    location :'Quter' ,
    date : Date.now(),
    create_at : Date.now(),
    }),
     new Event ({
    title: 'Beach Cleaning At IBB',
    description :'This EvenT Abboud And An Big In World ' ,
    location :'Arah' ,
    date : Date.now(),
    create_at : Date.now(),
    }),
     new Event ({
    title: 'Beach Cleaning At Aden',
    description :'This EvenT Abboud And An Smaller In World ' ,
    location :'Gaza' ,
    date : Date.now(),
    create_at : Date.now(),
    }),
     new Event ({
    title: 'Beach Cleaning At Qater',
    description :'This EvenT Abboud And An Bigger In World ' ,
    location :'Plasten' ,
    date : Date.now(),
    create_at : Date.now(),
    }),
     new Event ({
    title: 'Beach Cleaning At Gaza',
    description :'This EvenT Abboud And An Meden In World ' ,
    location :'Trukia' ,
    date : Date.now(),
    create_at : Date.now(),
    }),
     new Event ({
    title: 'Beach Cleaning At Reqh',
    description :'This EvenT Abboud And An Middle That In World ' ,
    location :'Arabic ' ,
    date : Date.now(),
    create_at : Date.now(),
    })
];

async function saveProducts() {
  try {
    for (const p of newEvent) {
      const doc = await p.save();
      console.log('✔️ Product saved:', doc.title);
    }
  } catch (err) {
    console.error('❌ Error saving product:', err);
  } //finally {
//     db.disconnect();
//   }
}

saveProducts();