// index.js
const express = require('express')
const cors = require('cors')
// const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectDB = require('./config/config.js')
const Todo = require('./todoModel.js')
// connectDB()

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopologu: true,
})

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})


mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
  })


app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
  connectToDatabase()
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todos.find()
        res.json(documents)
    }
    catch (error) {
        console.error('Error fetching TODOS:', error)
        res.sendStatus(500)
    }
})

// Export the Express API
module.exports = app