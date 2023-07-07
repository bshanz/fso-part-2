const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Total = (props) => {
  return <p>Number of exercises {props.sumOfExercises}</p>
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercises1={props.exercises1} />
      <Part part={props.part2} exercises1={props.exercises2} />
      <Part part={props.part3} exercises1={props.exercises3} />
    </div>
  )
}

const Course = ({course}) => {

  const totalExercises = course.parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);
  

  return (
    <>
      <h1>{course.name}</h1>
      {course.parts.map(part => 
        <div key={part.id}>
          <p>{part.name} {part.exercises}</p>
        </div>
      )}
      <div>total exercises: {totalExercises}</div>
    </>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  }

  return <Course course={course} />
}

export default App