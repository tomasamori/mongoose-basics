const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    summary: String,
    isbn: String,
    thumbnail: Buffer,
    author: { 
    	type: Schema.Types.ObjectId, 
    	ref: 'Author' 
    },
    ratings: [
    	{
            summary: String,
            detail: String,
            numberOfStars: Number,
            created: { 
                type: Date,
                default: Date.now
            }
    	}
    ],
    created: { 
    	type: Date,
    	default: Date.now
    }
});

module.exports = model('Book', bookSchema);