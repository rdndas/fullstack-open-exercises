const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return(
    <> 
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3} 
        exercise1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}/>
      <Total exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3} />
    </>
  )
}
// The components can be a normal function too 
// instead of arrow function expression
function Total ({exercises1, exercises2, exercises3}) {

 const total = exercises1 + exercises2 + exercises3 
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const Header = ({course}) => {

  return(
    <>
      <h1>{course}</h1>
    </>
  )
}

const Content = ({part1, part2, part3, exercises1, exercises2, exercises3}) => {

  return(
    <>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
    </>
  )
}

export default App