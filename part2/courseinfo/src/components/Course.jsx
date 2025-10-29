const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }) => (
  <div>
    <ul>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </ul>
  </div>
);

const Part = ({ part }) => (
  <li>
    {part.name} {part.exercises}
  </li>
); //Using implicit return. No return keyword is necessary and the function is wrapped in () instead of {}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <b>total of {total} exercises</b>;
};

const Course = ({ courses }) => {
  return courses.map((course) => (
    <>
      <Header name={course.name} /> 
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  ));
};

export default Course;
