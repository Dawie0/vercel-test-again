const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('connected to mongo')
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB