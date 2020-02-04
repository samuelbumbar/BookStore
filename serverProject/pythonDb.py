CREATE DATABASE bookshop;
USE bookshop;

CREATE TABLE books (
	id int,
    title varchar(50),
    author varchar(50),
    description varchar(50),
    publisher varchar(50),
    isbn varchar(50),
	PRIMARY KEY (id)
);

INSERT INTO books (title, author, description, publisher, isbn) VALUES ('Gone with the Wind', 'Margaret Mitchell', 'Is a novel by American writer', 'Macmillan Publishers', 123412341234);
INSERT INTO books (title, author, description, publisher, isbn) VALUES ('Pride and Prejudice', 'Jane Austen', 'Is an 1813 romantic novel of manners', 'T. Egerton, Whitehall', 432143214321);
INSERT INTO books (title, author, description, publisher, isbn) VALUES ('Emma', 'Jane Austen', 'Is a novel about youthful hubris and the perils', 'John Murray', 135713571357);
INSERT INTO books (title, author, description, publisher, isbn) VALUES ('The Hunchback of Notre-Dame', 'Victor Hugo', 'Is a French Gothic nove', '  Gosselin', 987698769876);
