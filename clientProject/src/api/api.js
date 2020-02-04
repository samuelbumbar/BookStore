const urlProd = 'SET URL WHEN DEPLOYED TO PRODUCTION';
const urlDev = 'http://localhost:5000/bookshop/api/v1.0';
const production = false;

export const api = {
  getBooks: () => `http://127.0.0.1:5000/bookshop/api/v1.0/books`
  //getBooks: () => `${production ? urlProd : urlDev}/books`
};

//http://127.0.0.1:5000/bookshop/api/v1.0/books
