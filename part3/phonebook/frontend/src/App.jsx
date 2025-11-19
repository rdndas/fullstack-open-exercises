import { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilterValue, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [msgType, setMsgType] = useState(null);

  useEffect(() => {
    personService.getObj("").then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    const index = persons.findIndex((person) => person.name === newName);

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
      setMessage(`Added ${newName}`);
      setMsgType("notify");

      setTimeout(() => {
        setMessage(null);
        setMsgType(null);
      }, 5000);

      return;
    } else {
      const thatPersonObj = persons.find((n) => n.name === newName);
      const changedPersonObj = { ...thatPersonObj, number: newNumber };
      const id = thatPersonObj.id;

      if (
        window.confirm(
          `${newName} is already in the phonebook. Do you want to update the number to ${newNumber}?`
        )
      ) {
        personService
          .updateObj(id, changedPersonObj)
          .then((newPerson) => {
            setPersons(
              persons.map((person) =>
                person.name === newName ? changedPersonObj : person
              )
            );
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              setMessage(
                `Information of ${newName} has already been removed from the server`
              );
              setMsgType("error");
              setPersons(persons.filter((p) => p.id !== id));
              setTimeout(() => {
                setMessage(null);
                setMsgType(null);
              }, 5000);
            }
          });
      }
    }
    setNewName("");
    setNewNumber("");
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
      <Notification clsName={msgType} message={message} />
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
