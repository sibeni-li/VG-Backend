// Imports
const multer = require('multer');

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// Export multer middleware configured to handle single file uploads with the field name 'image'
module.exports = multer({storage: storage}).single('image');