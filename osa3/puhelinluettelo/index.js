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
  Entry.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));

  console.log("deleted id:", request.params.id);
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;
  const sameNameCount = persons.filter(person => person.name === name).length;
  Entry.find({}).then(entries => {
    console.log("entries", entries);
  });

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

  const entry = new Entry({
    name: name,
    number: number
  });

  entry.save().then(savedEntry => {
    response.json(savedEntry.toJSON());
  });
});

app.get("/api/info", (request, response) => {
  response.send(
    `<div>Phonebook has info for ${
      persons.length
    } people</div><div>${new Date()}</div>`
  );
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind == "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

//module.exports = app;

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
