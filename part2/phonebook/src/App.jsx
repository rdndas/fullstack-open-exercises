import { useState, useEffect } from "react";
import axios from "axios";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilterValue, setNewFilter] = useState("");

  useEffect(() => {
    personService.getObj("http://localhost:3001/persons").then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    const index = persons.findIndex((person) => person.name === newName);

    console.log(`index is ${index}`)

    if (index === -1) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService.createObj(newPerson).then((addedPerson) => {
        setPersons(persons.concat(addedPerson));
        setNewName("");
        setNewNumber("");
      });

      return;
    } else {
      const thatPersonObj = persons.find((n) => n.name=== newName)
      const changedPersonObj = {...thatPersonObj, number: newNumber }
      const id = thatPersonObj.id
      console.log('update Person: ',thatPersonObj)
      console.table('changed person: ',changedPersonObj)
      if (window.confirm(`${newName} is already in the phonebook. Do you want to update the number to ${newNumber}?`)){
        personService.updateObj(id, changedPersonObj).then((newPerson) => {
        setPersons(persons.map((person) => (person.name === newName ? changedPersonObj : person)))
      })
      }   
    }
    setNewName("");
    setNewNumber("")
  };

  const handleNumberchange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterValue = (event) => {
    setNewFilter(event.target.value);
  };

  const removePerson = (id) => {
    const personToDelete = persons.find((p) => p.id === id);
    if (!personToDelete) {
      return;
    }

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deleteObj(id)
        .then(() => {
          // Success: Remove the person from the local state
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          // Check if the error is a 404 (item not found)
          if (error.response && error.response.status === 404) {
            console.log("Person already deleted on server, removing from UI.");
            // Still remove it from state so the UI is fixed
            setPersons(persons.filter((p) => p.id !== id));
          } else {
            // Log other errors (network failure, 500 status, etc.)
            console.error("Error deleting person:", error);
            alert("There was a some error deleting the person.");
          }
        });
    }
  };

  const personsToShow = newFilterValue
    ? persons.filter((item) => {
        const itemNameLower = item.name.toLowerCase();
        const searchNameLower = newFilterValue.toLowerCase();

        return itemNameLower.includes(searchNameLower);
      })
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newFilterValue} onChange={handleFilterValue} />
      <h2>add a new </h2>
      <PersonForm
        nameValue={newName}
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberchange}
        onSubmit={addName}
      />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <Person key={person.id} person={person} deletePerson={removePerson} />
        ))}
      </ul>
    </div>
  );
};

export default App;
