// Imports
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Define the schema for a user
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Apply the uniqueValidator plugin to ensure unique email addresses
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);