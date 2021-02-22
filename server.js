/* eslint-disable no-undef */

// ! Phone book using JSON object {Rino Kitimbo & Sylvia Bonabana.

const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan('tiny'))

let persons = [
  {
    name: 'Rino Kitimbo',
    number: '+256-706144964',
    id: 1,
  },
  {
    name: 'Sylvia Bonabana',
    number: '+256-532352355',
    id: 2,
  },
  {
    name: 'Marie Musimenta',
    number: '+256-43234345',
    id: 3,
  },
  {
    name: 'Ismail Asega',
    number: '+256-64231223',
    id: 4,
  },
]

// Retrieve persons details.
app.get('/api/persons', (req, res) => {
  res.send(persons)
})

// Retrieving person with specific id.
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  // eslint-disable-next-line no-shadow
  const person = persons.find((person) => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

// Deleting peron with specific id.
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((person) => person.id !== id)
  res.status(204).end()
})

// Log of persons in phone adress book.
app.get('/api/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`,
  )
})

// Random id generator.
const generateId = () => Math.floor(Math.random() * 1000000000)

// Saving to JSON Object.
// eslint-disable-next-line consistent-return
app.post('/api/persons', (req, res) => {
  const { body } = req
  const nameIsNotUnique = Boolean(
    persons.find((person) => person.name === body.name),
  )

  if (!body.name && !body.number) {
    return res.status(400).json({
      error: 'name and number are missing',
    })
  }
  if (!body.name) {
    return res.status(400).json({
      error: 'name is missing',
    })
  }
  if (!body.number) {
    return res.status(400).json({
      error: 'number is missing',
    })
  }
  if (nameIsNotUnique) {
    return res.status(400).json({
      error: 'name must be unique',
    })
  }

  const person = {
    ...req.body,
    id: generateId(),
  }
  persons = persons.concat(person)
  res.json(person)
})

// Server connection.
const PORT = 3001
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`)
})
