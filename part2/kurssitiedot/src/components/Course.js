import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total sum={course.parts.map(part => part.exercises).reduce( (a, b) => a + b, 0 )} />
  </>
)


export default Course