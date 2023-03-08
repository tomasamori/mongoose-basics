// MongoDB connection

require('./connection');

// Requiring mongoose and models

const mongoose = require('mongoose');
const Author = require('./models/Author');
const Book = require('./models/Book');