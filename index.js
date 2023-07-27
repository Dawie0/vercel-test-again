// index.js
const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

const jwtSecretKey = 'abcd123yourmom'
const uri = 'mongodb+srv://dawidfouriecohort231:Chaos0766!@clusternumerodos.ljv9wwb.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, jwtSecretKey, { expiresIn: '1h' })
}

const connectToDatabase = async () => {
    try {
        await client.connect()
        console.log('Connected to MongoDB')
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
}


app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
  connectToDatabase()
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
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

app.post('/todos', async (req, res) => {
    try {
        const newTodo = req.body.todo
        
        const database = client.db('todos-database')
        const collection = database.collection('todos')

        const result = await collection.insertOne({ todo: newTodo })
        console.log('Inserted TODO:', result)

        res.sendStatus(201)
    }
    catch (error) {
        console.error('Error adding TODO:', error)
        res.sendStatus(500)
    }
})

app.post('/users/register', async (req, res) => {
    try {
        const { username, password } = req.body.user

        const database = client.db('todos-database')
        const collection = database.collection('user_data')

        const userExist = await collection.findOne({ 'user.username': username })
        if (userExist) {
            return res.status(400).json({ message: 'Username already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = {
            user: {
                username: username,
                password: hashedPassword
            }
        }

        const result = await collection.insertOne(newUser)

        const token = generateToken(result)

        res.status(201).json({ message: 'User registered successfully', token })
    }
    catch (error) {
        console.error('Error adding user:', error)
        res.sendStatus(500)
    }
})

app.post('/users/login', async (req, res) => {
    try {
        const { username, password } = req.body.user

        const database = client.db('todos-database')
        const collection = database.collection('user_data')

        const user = await collection.findOne({ 'user.username': username })
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = generateToken(user)

        res.json({ message: 'Login successful', token })
    }
    catch (error) {
        console.error('Error during login:', error)
        res.sendStatus(500)
    }
})

app.put('/todos/:id', async (req, res) => {
    try {
        const id = new ObjectId(req.params.id)
        const updatedTodo = req.body.todo
        
        const database = client.db('todos-database')
        const collection = database.collection('todos')

        const result = await collection.updateOne(
            { _id: id },
            { $set: { todo: updatedTodo } }
        )
        console.log('ID: ', id)
        console.log('Updated Todo: ', updatedTodo)
        console.log('Updated Todo:', result)

        res.sendStatus(200)
    }
    catch (error) {
        console.error('Error updating TODO', error)
        res.sendStatus(500)
    }
})

app.delete('/todos/:id', async (req, res) => {
    try {
        const id = new ObjectId(req.params.id)

        const database = client.db('todos-database')
        const collection = database.collection('todos')

        const result = await collection.deleteOne({ _id: id })
        console.log('Deleted TODO:', result)
        res.sendStatus(200)
    }
    catch(error) {
        console.error('Error deleting TODO:', error)
        res.sendStatus(500)
    }
})


// Export the Express API
module.exports = app