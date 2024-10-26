const express = require("express");
const app = express();
const morgan = require("morgan");
const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("---");
  next();
};

app.use(express.json());
app.use(requestLogger);
app.use(morgan("tiny"));

let persons = [
  {
    id: 1,
    name: "John Doe",
    number: "123-456-7890",
  },
  {
    id: 2,
    name: "Jane Doe",
    number: "987-654-3210",
  },
  {
    id: 3,
    name: "Bob Smith",
    number: "555-555-5555",
  },
  {
    id: 4,
    name: "Alice Johnson",
    number: "111-222-3334",
  },
];



app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const generateId = () => {
  const maxId = persons > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const { name, number } = body;
  if (!name || !number || persons.find((person) => person.name === name)) {
    return res.status(400).json({
      error: "name, number missing or name already exists",
    });
  }
  const person = {
    name: name,
    number: number,
    id: generateId(),
  };
  persons = persons.concat(person);
  res.json(person);
});

app.get("/info", (req, res) => {
  const date = new Date();
  const info = `<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`;
  res.send(info);
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
