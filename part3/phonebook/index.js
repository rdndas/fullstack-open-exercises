const express = require("express");
const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const sizeOfPersons = persons.length;
  const now = new Date();
  const formattedString = now.toString();

  response.send(
    `Phonebook has info for ${sizeOfPersons} people<br> ${formattedString}`
  );
});

app.get("/api/person/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.statusMessage = `There is no person with id: ${id}`;
    response.status(404).end();
  }
});

app.delete('/api/person/:id', (request,response) => {
    const id = request.params.id;

    persons = persons.filter(person => person.id !== id)
    
    response.status(204).end();
});

const generateId = () =>{
   const minId = 1;
   const maxId = 9;
   const maxAttempts = 100;
   const existingIds = new Set(persons.map(p => Number(p.id)));

   let attempts = 1;
   let newId;

   while (attempts < maxAttempts) {
        
        newId = Math.floor(Math.random() * (maxId - minId + 1) + minId);

        // Check for uniqueness
        if (!existingIds.has(newId)) {
            // Found a unique ID
            return newId; 
        }
        attempts++;
        console.log(`Conflict on ID ${newId}. Attempt: ${attempts}`);
    }
    throw new Error('Failed to generate a unique ID. ID pool may be exhausted.');
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ 
            error: 'Name is missing. Please provide a name.' 
        });
    }

    if (!body.number) {
        return response.status(400).json({ 
            error: 'Number is missing. Please provide a phone number.' 
        });
    }

    const duplicatePerson = persons.find(
    person => person.name.toLowerCase() === body.name.toLowerCase()
);

if (duplicatePerson) {
    return response.status(400).json({ 
        error: `Name must be unique. Name "${body.name}" already exists in the phonebook.`
    });
}

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person);
    console.log(person.id)
    response.json(person)
})


app.use((err, req, res, next) => {
    console.error("Caught an error in middleware:", err.message);

    if (err.message.includes('Failed to generate a unique ID')) {
        return res.status(500).json({ 
            error: err.message,
        });
    }

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        // Send a custom, clear error response
        res.statusMessage = 'Invalid JSON'
        return res.status(400).send({ message: 'Invalid JSON format in request body' });
    }

    res.status(500).json({
        error: 'An unexpected server error occurred.'
    });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
