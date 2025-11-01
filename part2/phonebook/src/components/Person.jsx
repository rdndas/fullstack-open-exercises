// const Person = ({person}) => {
//     return <li>{person.name} {person.number}</li>
// }

const Person = ({ person, deletePerson }) => {
  const label = "delete";
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id)}>{label}</button>
    </li>
  );
};

export default Person;
