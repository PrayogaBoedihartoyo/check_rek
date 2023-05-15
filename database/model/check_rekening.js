const mongoose = require('mongoose');
const moment = require('moment-timezone');
const timeZone = 'Asia/Bangkok';
const date = moment.tz(Date.now(), timeZone);

const mySchema = new mongoose.Schema({
    name: String,
    no_rekening: String,
    bank: String,
    result: String,

    createdAt: {type: Date, default: date},
    updatedAt: {type: Date, default: date},
    deletedAt: {type: Date, default: null},

});
module.exports = mongoose.model('check_rekening', mySchema)