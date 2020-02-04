import React, { useState, useEffect } from 'react'

const EditBookForm = props => {
  const [ book, setBook ] = useState(props.currentBook);

  useEffect(
    () => {
      console.log("currentBook", props.currentBook);
      setBook(props.currentBook)
    },
    [ props ]
  );
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target;

    setBook({ ...book, [name]: value })
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        props.updateBook(book.id, book)
      }}
    >
      <label>Title</label>
      <input type="text" name="title" value={book.title} onChange={handleInputChange} />
			<label>Author</label>
			<input type="text" name="author" value={book.author} onChange={handleInputChange} />
      <label>Description</label>
      <input type="text" name="description" value={book.description} onChange={handleInputChange} />
      <label>Publisher</label>
      <input type="text" name="publisher" value={book.publisher} onChange={handleInputChange} />
      <label>ISBN</label>
      <input type="text" name="isbn" value={book.isbn} onChange={handleInputChange} />
      <button>Update book</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
};

export default EditBookForm
