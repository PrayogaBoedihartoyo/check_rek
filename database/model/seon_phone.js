const mongoose = require('mongoose');
const moment = require('moment-timezone');
const timeZone = 'Asia/Bangkok';
const date = moment.tz(Date.now(), timeZone);

const mySchema = new mongoose.Schema({
    number: Number,
    valid: Boolean,
    score: Number,
    account_details: {
        facebook: Boolean,
        google: Boolean,
        twitter: Boolean,
        instagram: Boolean,
        yahoo: Boolean,
        microsoft: Boolean,
        snapchat: Boolean,
        skype: Boolean,
        linkedin: Boolean,
        whatsapp: Boolean,
        telegram: Boolean,
        viber: Boolean,
        kakao: Boolean,
        ok: Boolean,
        zalo: Boolean,
        line: Boolean,
        flipkart: Boolean,
        bukalapak: Boolean,
        jdid: Boolean,
        tokopedia: Boolean,
    },


    createdAt: {type: Date, default: date},
    updatedAt: {type: Date, default: date},
    deletedAt: {type: Date, default: null},

});
module.exports = mongoose.model('seon_phone-401-500', mySchema)