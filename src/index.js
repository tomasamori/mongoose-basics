// MongoDB connection

require('./connection');

// Requiring mongoose and models

const mongoose = require('mongoose');
const Author = require('./models/Author');
const Book = require('./models/Book');

// Creating and saving author and books

async function createAuthorAndBooks() {
    const newAuthor = new Author({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: 'Stephen',
            lastName: 'Hillenburg'
        },
        biography: 'Stephen McDannell Hillenburg (August 21, 1961 – November 26, 2018) was an American animator, writer, producer, director, and marine science educator.',
        twitter: 'https://twitter.com/stephenhillenburg',
        facebook: 'https://www.facebook.com/stephenhillenburg'
    });

    authorSaved = await newAuthor.save();
    console.log(authorSaved);
    console.log('Author successfully saved.');

    const firstBook = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: 'SpongeBob Comics: Book 1: Silly Sea Stories',
        author: newAuthor._id,
        ratings: [{
            summary: 'Good comic'
        }]
    });

    firstBookSaved = await firstBook.save();
    console.log(firstBookSaved);
    console.log('Book successfully saved.');

    const secondBook = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: 'SpongeBob Comics: Book 2: Aquatic Adventurers, Unite!',
        author: newAuthor._id
    });

    secondBookSaved = await secondBook.save();
    console.log(secondBookSaved);
    console.log('Book successfully saved.');
}

createAuthorAndBooks().catch(err => console.log(err));