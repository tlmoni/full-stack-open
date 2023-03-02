import { useState, useEffect } from "react"

import Filter from "./components/Filter"
import Content from "./components/Content"
import countryService from "./services/countryService"

const App = () => {
  const [searchFilter, setSearchFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [content, setContent] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
      .catch(error =>
        console.log(error)
      )
  }, [])

  const updateSearchFilter = (event) => {
    setSearchFilter(event.target.value)
    setContent(
      countries.filter(country =>
        country.name.common.match(
          new RegExp(event.target.value, "i")
        )
      )
    )
  }

  return (
    <div>
      <Filter
        searchFilter={searchFilter}
        updateSearchFilter={updateSearchFilter}
      />
      <Content content={content} setContent={setContent}/>
    </div>
  )
}

export default App;
