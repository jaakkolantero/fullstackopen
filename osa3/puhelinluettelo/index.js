require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var morgan = require("morgan");
const cors = require("cors");

const Entry = require("./models/entry");

var persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

morgan.token("post", function(request, response) {
  const { name, number } = request.body;
  if (name && number)
    return `{"name":"${request.body.name}", "number";"${request.body.number}"}`;
  return "";
});

app.use(cors());
app.use(bodyParser.json());
app.use(
  morgan(":method :status :res[content-length] - :response-time ms :post")
);

app.get("/api/persons", (request, response) => {
  Entry.find({}).then(entries => {
    response.json(entries);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  console.log("id", request.params.id);
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;
  const sameNameCount = persons.filter(person => person.name === name).length;

  if (!number) {
    return response.status(400).json({
      error: "number missing"
    });
  }

  if (!name) {
    return response.status(400).json({
      error: "name missing"
    });
  }

  if (sameNameCount) {
    return response.status(400).json({
      error: "name must be unique"
    });
  }

  const person = {
    name,
    number,
    id: getRandomInt(9001)
  };

  persons = persons.concat(person);

  response.json(person);
});

app.get("/api/info", (request, response) => {
  response.send(
    `<div>Phonebook has info for ${
      persons.length
    } people</div><div>${new Date()}</div>`
  );
});

//module.exports = app;

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
