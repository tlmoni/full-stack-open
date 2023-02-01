import Country from "./Country"

const Content = ({ content, setContent }) => {
  if (content.length > 10) {
    return (
      <p>
        Too many matches, specify another filter
      </p>
    )
  }
  else if (content.length === 0) {
    return <p></p>
  }
  else if (content.length > 2 && content.length < 10) {
    return (
      <ul>
        {content.map((country, i) =>
          <li key={i}>
            {country.name.common} <button onClick={() => setContent([country])}>show</button>
          </li>
        )}
      </ul>
    )
  }
  else {
    return (
      <Country country={content[0]}/>
    )
  }
}

export default Content