Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username, password
  }).then(({ body }) => {
    localStorage.setItem("loggedUser", JSON.stringify(body))
    cy.visit("")
  })
})

Cypress.Commands.add("addBlog", (blog) => {
  cy.request({
    url: "http://localhost:3001/api/blogs",
    method: "POST",
    body: blog,
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("loggedUser")).token}`
    }
  })
  cy.visit("")
})