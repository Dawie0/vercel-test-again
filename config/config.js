const mongoose = require('mongoose')
const dotenv = require('dotenv')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('connected to mongo')
    } catch (err) {
        console.error('Well this didnt work:', err);
    }
}

module.exports = connectDB