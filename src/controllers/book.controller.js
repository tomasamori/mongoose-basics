// MongoDB connection

require('../connection');

// Requiring model

const Book = require('../models/Book');

// Get all books

async function getAllBooks() {
    const books = await Book.find();
    console.log(books);
}

// Get book by id

async function getBookById() {
    const book = await Book.findById('64089e4577ad399602f9991a'); // this id is different in your database. You can use one from the previous query.
    console.log(book);
}

// Update book by id

async function updateBookById() {
    const updatedBook = await Book.findByIdAndUpdate('64089e4577ad399602f9991a', { isbn: '9781537963891' });
    console.log(updatedBook);
}

// Delete book by id

async function deleteBookById() {
    await Book.findByIdAndDelete('64089e4577ad399602f9991a');
    console.log('Book successfully deleted');
}