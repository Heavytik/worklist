require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

console.log('new request')

app.use(cors())
app.use(express.json())

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  tasks: [String],
})

const Person = mongoose.model('Person', personSchema)

app.get('/', (req, res) => {
  res.send('<h1>There is nothing</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.put('/api/persons/:id', (req, res) => {
  console.log(req.body)
  const body = req.body

  const person = {
    name: body.name,
    tasks: body.tasks
  }

  Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    }).catch(() => res.status(404).end())
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})