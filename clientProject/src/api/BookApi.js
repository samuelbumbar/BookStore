// import {api} from './api';
import axios from 'axios';

class BookApi {
  async getBooksAxios(){
    console.log("fdsf");
  const response =
    await axios.get("http://127.0.0.1:5000/bookshop/api/v1.0/books")
  console.log(response.data)
}

    async getBooksApi() {
        // console.debug("ItemService.getBooks():");
        // console.debug(json);
        return fetch('http://127.0.0.1:5000/bookshop/api/v1.0/books', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                // if (!response.ok) {
                //     console.log("GRESIT");
                //     this.handleResponseError(response);
                // }
                return response.json();
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    handleResponseError(response) {
        throw new Error("HTTP error, status = " + response.status);
    }
    handleError(error) {
        console.debug(error.message);
    }
}

// async getBooksApi(json) {
//     console.debug("ItemService.getBooks():");
//     console.debug(json);
//     return fetch(api.getBooks(), {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(json)
//     })
//         .then(response => {
//             // if (!response.ok) {
//             //     console.log("GRESIT");
//             //     this.handleResponseError(response);
//             // }
//             return response.json();
//         })
//         .catch(error => {
//             this.handleError(error);
//         });
// }
//
// handleResponseError(response) {
//     throw new Error("HTTP error, status = " + response.status);
// }
// handleError(error) {
//     console.debug(error.message);
// }
// }

export default BookApi;
