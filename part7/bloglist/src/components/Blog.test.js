import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Blog from "./Blog"

describe("<Blog />", () => {
  const user = {
    id: "1234567890",
    username: "test",
    name: "Test User"
  }

  const blog = {
    title: "Testing is important",
    author: "Anonymous",
    url: "https://example.com/testing-is-important",
    likes: 7,
    user: user
  }

  const mockUpdateBlog = jest.fn()
  const mockRemoveBlog = jest.fn()

  test("Renders both title and author for a blog", () => {
    render(
      <Blog
        user={user}
        blog={blog}
        updateBlog={mockUpdateBlog}
        removeBlog={mockRemoveBlog}
      />
    )

    const element = screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()
  })

  test("Clicking the view button displays URL and number of likes", async () => {
    render(
      <Blog
        user={user}
        blog={blog}
        updateBlog={mockUpdateBlog}
        removeBlog={mockRemoveBlog}
      />
    )

    const eventUser = userEvent.setup()
    const button = screen.getByText("View")
    await eventUser.click(button)

    const url = screen.getByText(`${blog.url}`)
    expect(url).toBeDefined()

    const likes = screen.getByText(`${blog.likes} likes`)
    expect(likes).toBeDefined()

    const blogUser = screen.getByText(`${blog.user.name}`)
    expect(blogUser).toBeDefined()
  })

  test("Clicking the view button displays URL and number of likes", async () => {
    const { container } = render(
      <Blog
        user={user}
        blog={blog}
        updateBlog={mockUpdateBlog}
        removeBlog={mockRemoveBlog}
      />
    )

    const eventUser = userEvent.setup()
    const button = container.querySelector("#like-button")
    await eventUser.click(button)
    await eventUser.click(button)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
  })
})
