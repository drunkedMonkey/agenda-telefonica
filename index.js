const express = require('express');
const app = express();

let persons = [
    {
        id: 1,
        name: 'John Doe',
        number: '123-456-7890'
    },
    {
        id: 2,
        name: 'Jane Doe',
        number: '987-654-3210'
    },
    {
        id: 3,
        name: 'Bob Smith',
        number: '555-555-5555'
    },
    {
        id: 4,
        name: 'Alice Johnson',
        number: '111-222-3334'
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
});

app.get('/info', (req, res)=>{
    const date = new Date();
    const info = `<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`
    res.send(info)
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})