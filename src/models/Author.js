const { Schema, model } = require('mongoose');

const authorSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    biography: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    profilePicture: Buffer,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Author', authorSchema);