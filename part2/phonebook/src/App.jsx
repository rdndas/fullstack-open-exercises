import { useState } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilterValue, setNewFilter] = useState("");

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
      <PersonForm nameValue={newName} nameChange = {handleNameChange} numberValue = {newNumber} numberChange = {handleNumberchange} onSubmit={addName} />
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
