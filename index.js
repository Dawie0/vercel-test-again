// index.js
const express = require('express')
const cors = require('cors')
// const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')

dotenv.config()
const app = express()
const PORT = 4000
app.use(express.json())
app.use(cors())

// const mongodbURI = process.env.MONGODB_URI

// const client = new MongoClient(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })

// const connectToDatabase = async () => {
//     try {
//         await client.connect()
//         console.log('Connected to MongoDB')
//     }
//     catch (error) {
//         console.error('Error connecting to MongoDB:', error)
//     }
// }


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

// app.get('/todos', async (req, res) => {
//     try {
//         const database = client.db('todos_database')
//         const collection = database.collection('todos')

//         const cursor = collection.find()
//         const documents = await cursor.toArray()

//         res.json(documents)
//     }
//     catch (error) {
//         console.error('Error fetching TODOS:', error)
//         res.sendStatus(500)
//     }
// })

// Export the Express API
module.exports = app