// index.js
const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')
// const mongoose = require('mongoose')
// const connectDB = require('./config/config.js')
// const Todo = require('./todoModel.js')
// connectDB()

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())


const uri = 'mongodb+srv://dawidfouriecohort231:Chaos0766!@clusternumerodos.ljv9wwb.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const connectToDatabase = async () => {
    try {
        await client.connect()
        console.log('Connected to MongoDB')
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
}

// mongoose.connect("mongodb+srv://dawidfouriecohort123:Chaos0766!@clusternumerodos.ljv9wwb.mongodb.net/todos-database?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

// mongoose.connection.on('connected', () => {
//     console.log('Connected to MongoDB')
// })


// mongoose.connection.on("error", (err) => {
//     console.error("Error connecting to MongoDB:", err);
//   })


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
        const database = client.db('todos-database')
        const collection = database.collection('todos')

        const cursor = collection.find()
        const documents = await cursor.toArray()

        res.json(documents)
    }
    catch (error) {
        console.error('Error fetching TODOS:', error)
        res.sendStatus(500)
    }
})

// app.get('/todos', async (req, res) => {
//     try {
//         const todos = await Todo.find()
//         res.json(todos)
//     }
//     catch (error) {
//         console.error('Error fetching TODOS:', error)
//         res.sendStatus(500)
//     }
// })

// Export the Express API
module.exports = app