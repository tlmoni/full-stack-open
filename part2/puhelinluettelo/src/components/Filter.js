const Filter = ({ searchFilter, updateSearchFilter }) => {
  return (
    <>
      filter shown with
      <input
        value={searchFilter}
        onChange={updateSearchFilter} />
    </>
  )
}

export default Filter