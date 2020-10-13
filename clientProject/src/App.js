import React, { Component, Fragment } from 'react';
import './App.css';
import AddBookForm from './forms/AddBookForm'
import EditBookForm from './forms/EditBookForm'
import BookTable from './tables/BookTable';
// import BookApi from "./api/BookApi";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books : [{}],
      isLoading: true,
      editing: false,
      setEditing: false,
      currentBook: {
       id: null,
       title: '',
       author: '',
       description: '',
       publisher: '',
       isbn: ''
      },
      setCurrentBook: {
       id: null,
       title: '',
       author: '',
       description: '',
       publisher: '',
       isbn: ''
      }
    };
  }

componentWillMount() {
  axios.get('http://127.0.0.1:5000/bookshop/api/v1.0/books')
        .then( (response) => {
          console.log("response", response);
          this.setState({
            books: response.data.books,
           isLoading: false
          });
          console.log("books", this.state.books);
        })
        .catch( (error) => {
          console.log(error);
        });
}

addBook = book => {
  console.log("to add");
  console.log("add", book);

  axios.post('http://127.0.0.1:5000/bookshop/api/v1.0/books', {
      title: book.title,
      author: book.author,
      description: book.description,
      publisher: book.publisher,
      isbn: book.isbn
      })
      .then(response => {
        console.log("response", response);
        this.setState({
          books: response.data.books,
        });
      })
}

updateBook = (id, updateBook) => {
  this.setState({
    setEditing: false
  });

  console.log("to update", updateBook);

  let url = 'http://127.0.0.1:5000/bookshop/api/v1.0/books/' + id;
  axios.put(url, {
      title: updateBook.title,
      author: updateBook.author,
      description: updateBook.description,
      publisher: updateBook.publisher,
      isbn: updateBook.isbn
      })
      .then(response => {
        console.log("response", response);
        this.setState({
          books: response.data.books,
        });
      })
}

deleteBook = id => {
  console.log("delete book");
console.log("id", id);
  this.setState({
    setEditing: false
  });

  let url = 'http://127.0.0.1:5000/bookshop/api/v1.0/books/' + id;
  axios.delete(url, { data: {} })
    .then( (response) => {
    console.log("response", response);
    this.setState({
      books: response.data.books,
    });
  }).catch( (error) => {
    console.log(error);
  });
};

editRow = book => {
  console.log("edit row");
  this.setState({
    editing: true,
    setEditing: true,
    setCurrentBook: book,
    currentBook: book
  });
  console.log("hh ", this.state.setCurrentBook);
  console.log("b ", book);
  // this.setState({
  //   setCurrentBook: book,
  // });

  // setCurrentBook({ id: book.id, title: book.title, author: book.author, age: book.age, description: book.description })
};

  render() {
    return (
       <div className="App">
         <h1>Book Track Keeper</h1>
         <div className="flex-row">
           <div className="flex-large">
             {this.state.editing ? (
               <Fragment>
                 <h2>Edit book</h2>
                 <EditBookForm
                   editing={this.state.editing}
                   setEditing={this.state.setEditing}
                   currentBook={this.state.currentBook}
                   updateBook={this.updateBook}
                 />
               </Fragment>
             ) : (
               <Fragment>
                 <h2>Add Book</h2>
                 <AddBookForm addBook={this.addBook} />
               </Fragment>
             )}
           </div>
           <div className="flex-large">
             { !this.state.isLoading &&
               <h2>View books</h2>
             }
              { !this.state.isLoading &&
                <BookTable books={this.state.books} editRow={this.editRow} deleteBook={this.deleteBook} />
              }
           </div>
   			</div>
       </div>
     );
  }
}

export default App;
