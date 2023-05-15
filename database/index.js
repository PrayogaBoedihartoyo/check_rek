const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin123@cluster0.a7f1sjz.mongodb.net/db_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const dbMongo = mongoose.connection;
dbMongo.on('open', () => {
    console.log('connected to mongoDB...')
})
module.exports={
    dbMongo
}