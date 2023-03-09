import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import BlogForm from "./BlogForm"

describe("<BlogForm />", () => {
  const blog = {
    title: "Testing is important",
    author: "Anonymous",
    url: "https://example.com/testing-is-important"
  }

  test("The form calls callback with the right data when a blog is created", async () => {
    const user = userEvent.setup()
    const mockAddBlog = jest.fn()

    const { container } = render(
      <BlogForm addBlog={mockAddBlog} />
    )

    const titleInput = container.querySelector("#title")
    const authorInput = container.querySelector("#author")
    const urlInput = container.querySelector("#url")
    const submitButton = screen.getByText("Add")

    await user.type(titleInput, `${blog.title}`)
    await user.type(authorInput, `${blog.author}`)
    await user.type(urlInput, `${blog.url}`)
    await user.click(submitButton)

    expect(mockAddBlog.mock.calls).toHaveLength(1)
    expect(mockAddBlog.mock.calls[0][0].title).toBe(`${blog.title}`)
    expect(mockAddBlog.mock.calls[0][0].author).toBe(`${blog.author}`)
    expect(mockAddBlog.mock.calls[0][0].url).toBe(`${blog.url}`)
  })
})
