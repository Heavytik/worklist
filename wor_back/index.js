require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  tasks: [String],
})

const Person = mongoose.model('Person', personSchema)

let persons = []

Person.find({}).then(result => persons = result )

/*
const person1 = new Person({
  name: 'person1',
  tasks: [
    'Do some work',
    'Do a little bit more work'
  ]
})

const person2 = new Person(
{
  name: 'person2',
  tasks: [
    'Do some cleaning',
    'Do some laundry'
  ]
})

person1.save().then(result => {
  console.log('First person saved')
  person2.save().then(result2 => {
    console.log('person2 saved')
    mongoose.connection.close()
  })
})
*/

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons.map(person => person.toJSON()))
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})