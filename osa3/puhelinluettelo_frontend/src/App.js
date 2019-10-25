import React, { useState, useEffect } from "react";
import Filter from "./App/Filter";
import Add from "./App/Add";
import List from "./App/List";
import personsService from "./services/persons";
import Notification from "./App/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [display, setDisplay] = useState(false);
  const [notification, setNotification] = useState({
    negative: false,
    message: ""
  });

  useEffect(() => {
    personsService.getAll().then(initialPersons => setPersons(initialPersons));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [display]);

  const personsToShow = filter
    ? persons.filter(
        person =>
          person.name.toUpperCase().includes(filter.toUpperCase()) ||
          person.number.includes(filter)
      )
    : persons;

  const handleCreate = e => {
    e.preventDefault();
    const sameName = persons.filter(person => person.name === newName)[0];
    if (sameName === undefined) {
      personsService
        .create({ name: newName, number: newNumber })
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson));
          setNotification({
            negative: false,
            message: "Person created."
          });
          setDisplay(true);
          setNewName("");
          setNewNumber("");
        })
        .catch(error => {
          setNotification({
            negative: true,
            message: error.message
          });
          setDisplay(true);
        });
    } else {
      if (window.confirm(`${newName} already exists. Update number?`)) {
        personsService
          .update({ ...sameName, number: newNumber })
          .then(returnedPerson => {
            if (returnedPerson.id !== undefined) {
              setPersons(
                persons.map(person =>
                  person.id !== sameName.id ? person : returnedPerson
                )
              );
              setNotification({ negative: false, message: "Person updated." });
            }
          })
          .catch(error => {
            setNotification({
              negative: true,
              message: error.message
            });
            setPersons(persons.filter(person => person.id !== sameName.id));
          });

        setDisplay(true);
        setNewName("");
        setNewNumber("");
      }
    }
  };

  const handleDelete = personToDelete => {
    personsService.deletePerson(personToDelete);
    setPersons(persons.filter(person => person.id !== personToDelete.id));
    setNotification({ negative: true, message: "Person deleted." });
    setDisplay(true);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        negative={notification.negative}
        display={display}
      />
      <Filter filter={filter} handleFilter={e => setFilter(e.target.value)} />
      <Add
        handleCreate={handleCreate}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <List persons={personsToShow} onDelete={handleDelete} />
    </div>
  );
};

export default App;
