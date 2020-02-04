import React, { useState } from 'react'

const AddBookForm = props => {
	const initialFormState = { id: null, title: '', author: '', description: '', publisher: '', isbn: '' };
	const [ book, setBook ] = useState(initialFormState);

	const handleInputChange = event => {
		const { name, value } = event.target;

		setBook({ ...book, [name]: value })
	};

	return (
		<form
			onSubmit={event => {
				event.preventDefault();
				if (!book.title || !book.author || !book.description || !book.publisher || !book.isbn) return;
				console.log(props);
				props.addBook(book);
				setBook(initialFormState)
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
			<button>Add new book</button>
		</form>
	)
};

export default AddBookForm
