import { gql  } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const ALL_BOOKS_BY_GENRE = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author {
        name
      }
    }
  }
`

export const EDIT_BIRTH_YEAR = gql`
  mutation editBirthYear($name: String!, $setBornTo: Int!){
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
      ) {
        name
        born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres
      author {
        name
      }
    }
  }
`