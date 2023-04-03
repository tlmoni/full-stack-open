describe("Blogs app", function () {
  const blog = {
    title: "Testing is important",
    author: "Anonymous",
    url: "https://example.com/testing-is-important"
  }

  const user = {
    username: "noot",
    name: "Pingu",
    password: "noot"
  }

  const anotherUser = {
    username: "root",
    name: "Root",
    password: "root"
  }

  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset")
    cy.request("POST", "http://localhost:3001/api/users", user)
    cy.request("POST", "http://localhost:3001/api/users", anotherUser)
    localStorage.clear()
    cy.visit("")
  })

  it("Login from is shown by default", function () {
    cy.contains("Username:")
    cy.contains("Password:")
  })

  describe("Login", function () {
    it("Login fails with wrong password", function () {
      cy.get("#username").type("groot")
      cy.get("#password").type("groot")
      cy.get("#login-button").click()

      cy.get("#notification").should("contain", "Wrong username or password")

      cy.get("html").should("not.contain", "Logged in as Pingu")
    })

    it("User can login with correct credentials", function () {
      cy.get("#username").type("noot")
      cy.get("#password").type("noot")
      cy.get("#login-button").click()

      cy.contains("Logged in as Pingu")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password })
    })

    it("A logged user can create a blog", function () {
      cy.get("#title").type(blog.title)
      cy.get("#author").type(blog.author)
      cy.get("#url").type(blog.url)
      cy.get("#add-blog").click()

      cy.contains("Testing is important Anonymous")
    })

    it("A logged user can like a blog", function () {
      cy.addBlog(blog)

      cy.contains("Testing is important Anonymous")
        .parent()
        .contains("View")
        .as("viewButton")
      cy.get("@viewButton").click()
      cy.contains("0 likes")
      cy.get("#like-button").click()
      cy.contains("1 likes")
    })

    it("User who created a blog can delete it", function () {
      cy.addBlog(blog)

      cy.contains("Testing is important Anonymous")
        .parent()
        .contains("View")
        .as("viewButton")
      cy.get("@viewButton").click()
      cy.get("#remove").click()

      cy.get("html").should("not.contain", "Testing is important Anonymous")
    })

    it("Only user who has created the blog can see the remove button", function () {
      cy.addBlog(blog)

      cy.contains("Testing is important Anonymous")
        .parent()
        .contains("View")
        .as("viewButton")
      cy.get("@viewButton").click()
      cy.contains("Remove")

      cy.get("#logout").click()
      cy.login(anotherUser)

      cy.contains("Testing is important Anonymous")
        .parent()
        .contains("View")
        .as("viewButton")
      cy.get("@viewButton").click()

      cy.get("html").should("not.contain", "Remove")
    })
  })
  describe("Blogs are ordered by number of likes", function () {
    beforeEach(function () {
      cy.login(user)
      cy.addBlog({
        title: "test1",
        author: "Noot",
        url: "http://example.com/test1"
      })
      cy.contains("test1 Noot").parent().as("blog1")
      cy.addBlog({
        title: "test2",
        author: "Doot",
        url: "http://example.com/test2"
      })
      cy.contains("test2 Doot").parent().as("blog2")
      cy.addBlog({
        title: "test3",
        author: "Groot",
        url: "http://example.com/test3"
      })
      cy.contains("test3 Groot").parent().as("blog3")
    })

    it("they are ordered by number of likes", function () {
      cy.get("@blog1").contains("View").click()
      cy.get("@blog1").contains("Like").as("like1")
      cy.get("@blog2").contains("View").click()
      cy.get("@blog2").contains("Like").as("like2")
      cy.get("@blog3").contains("View").click()
      cy.get("@blog3").contains("Like").as("like3")

      // Like blogs in "random" order
      cy.get("@like2").click()
      cy.wait(500)
      cy.get("@like1").click()
      cy.wait(500)
      cy.get("@like1").click()
      cy.wait(500)
      cy.get("@like3").click()
      cy.wait(500)
      cy.get("@like3").click()
      cy.wait(500)
      cy.get("@like3").click()
      cy.wait(500)

      cy.get(".blog").eq(0).should("contain", "test3 Groot")
      cy.get(".blog").eq(1).should("contain", "test1 Noot")
      cy.get(".blog").eq(2).should("contain", "test2 Doot")
    })
  })
})
