import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = () => {
  const style = {
    marginBottom: 10
  }

  const dispatch = useDispatch()

  const updateFilter = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <div style={style}>
        filter <input onChange={updateFilter} />
    </div>
  )
}

export default Filter