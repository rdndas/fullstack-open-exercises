const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return(
    <> 
      <Header course={course} />
     <Content parts={course["parts"]} />  
      <Total parts={course["parts"]} />
    </>
  )
}

// The components can be a normal function too 
// instead of arrow function expression
function Total ({parts}) {

 const total = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const Header = ({course}) => {

  return(
    <>
      <h1>{course.name}</h1>
    </>
  )
}

const Content = ({parts}) => {

  return(
    <>
      <p>
        {parts[0].name} {parts[0].exercises}
      </p>
      <p>
        {parts[1].name} {parts[1].exercises}
      </p>
      <p>
        {parts[2].name} {parts[2].exercises}
      </p>
    </>
  )
}

export default App