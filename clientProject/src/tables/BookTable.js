import React from 'react'

const BookTable = props => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Description</th>
        <th>Publisher</th>
        <th>ISBN</th>
      </tr>
    </thead>
    <tbody>
      {props.books.length > 0 ? (
        props.books.map(book => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.description}</td>
            <td>{book.publisher}</td>
            <td>{book.isbn}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(book)
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteBook(book.id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No books</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default BookTable
