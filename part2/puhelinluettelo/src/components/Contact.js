const Contact = ({ name, number, deleteContact }) => {
  return (
    <>
      <form onSubmit={deleteContact}>
        {name} {number} <button type="submit">delete</button>
      </form>
    </>
  )
}


export default Contact