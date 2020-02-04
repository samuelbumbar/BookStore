# execute with python app.py

#!flask/bin/python
import mysql.connector
from flask import Flask, jsonify, abort
from flask_cors import CORS, cross_origin
from flask import request

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
mydb = mysql.connector.connect(host="localhost",           # your host, usually localhost
                               port="3307",                # your port
                               user="root",                # your username
                               passwd="",                  # your password
                               database="my_database")     # name of the data base

"""
books = [
        {
          'id': 1,
          'name': 'Wind',
          'description': 'aaaa',
          'publisher': 'sigma',
          'isbn': '123456789'
        },
        {
          'id': 2,
          'name': 'N',
          'description': 'b',
          'publisher': 'sigma',
          'isbn': '8987654321'
        }
]
"""

books = []

def selectBooks():
  # books = [{}]
  mycursor = mydb.cursor()

    # Use all the SQL you like
  mycursor.execute("SELECT * FROM books")

  for row in mycursor.fetchall():
    book = {
      'id': row[0],
      'title': row[1],
      'author': row[2],
      'description': row[3],
      'publisher': row[4],
      'isbn': row[5]
    }
    ok = 0
    for b in books:
      print(b)
      if b['id'] == row[0]:
        ok = 1
        b['title'] = row[1]
        b['author'] = row[2],
        b['description'] = row[3],
        b['publisher'] = row[4],
        b['isbn'] = row[5]

    if ok == 0:
      books.append(book) 

  # print(books)

# insert book
def insertBook(title, author, description, publisher, isbn):
    mycursor = mydb.cursor()
    
    sql = "INSERT INTO books (title, author, description, publisher, isbn) VALUES (%s, %s, %s, %s, %s)"
    val = (title, author, description, publisher, isbn)
    mycursor.execute(sql, val) 
    mydb.commit()
    
# delete book
def deleteBook(id):
    mycursor = mydb.cursor()
    
    sql = "DELETE FROM books WHERE id = " + str(id)
    mycursor.execute(sql)
    mydb.commit()
    
# update book
def updateBook(id, title, author, description, publisher, isbn):
    mycursor = mydb.cursor()

    sql = "UPDATE books SET title = %s, author = %s, description = %s, publisher = %s, isbn = %s WHERE id = %s"
    val = (title, author, description, publisher, isbn, id)
    mycursor.execute(sql, val)
    mydb.commit()

@app.route('/bookshop/api/v1.0/books', methods=['GET'])
@cross_origin()
def get_books():
    selectBooks()
    print(books)
    return jsonify({'books': books})
  
@app.route('/bookshop/api/v1.0/books', methods=['POST'])
@cross_origin()
def create_book():
    if not request.json: # or not 'name' in request.json:
        abort(400)
    # book = {
    #     'id': books[-1]['id'] + 1,
    #     'title': request.json['title'],
    #     'author': request.json['author'],
    #     'description': request.json['description'],
    #     'publisher': request.json['publisher'],
    #     'isbn': request.json['isbn']
    # }
    insertBook(request.json['title'], request.json['author'], request.json['description'], request.json['publisher'], request.json['isbn'])
    selectBooks()
    return jsonify({'books': books}), 201
    
@app.route('/bookshop/api/v1.0/books/<int:book_id>', methods=['PUT'])
@cross_origin()
def update_book(book_id):
    # book = [book for book in books if book['id'] == book_id]
    # if len(book) == 0:
        # abort(404)
    if not request.json:
        abort(400)

    print("asdffffffffffffffffffffffffff")

    title = request.json['title']
    author = request.json['author']
    description = request.json['description']
    publisher = request.json['publisher']
    isbn = request.json['isbn']

    updateBook(book_id, title, author, description, publisher, isbn)
    selectBooks()
    return jsonify({'books': books})
  
@app.route('/bookshop/api/v1.0/books/<int:book_id>', methods=['DELETE'])
@cross_origin()
def delete_book(book_id):
    book = [book for book in books if book['id'] == book_id]
    if len(book) == 0:
        abort(404)
    deleteBook(book_id)
    selectBooks()
    books.remove(book[0])
    return jsonify({'books': books})

if __name__ == '__main__':
    app.run(debug=True)
	
"""
CREATE TABLE books (
    id int,
    title varchar(50),
    author varchar(50),
    description varchar(50),
    publisher varchar(50),
    isbn varchar(50),
	PRIMARY KEY (ID)
);

"""