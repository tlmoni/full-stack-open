const Filter = ({ searchFilter, updateSearchFilter }) => {
  return (
    <>
      Find countries <input
        value={searchFilter}
        onChange={updateSearchFilter} />
    </>
  )
}

export default Filter