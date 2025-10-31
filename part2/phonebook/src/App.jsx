import { useState, useEffect } from "react";
import axios from "axios";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilterValue, setNewFilter] = useState("");

  useEffect(() => {

    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data)
    });
  },[]);

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
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
      return;
    }
    alert(`${newName} is already added to phonebook.`);
    setNewName("");
  };

  const handleNumberchange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterValue = (event) => {
    setNewFilter(event.target.value);
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
          <Person key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
