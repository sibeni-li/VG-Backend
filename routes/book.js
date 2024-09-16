// Imports
const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sharp = require('../middleware/sharp-config')
const bookCtrl = require('../controllers/book');
const router = express.Router();

// Define routes for book operations
router.post('/:id/rating', auth, bookCtrl.createRatingBook);
router.delete('/:id', auth, bookCtrl.deleteBook); 
router.put('/:id', auth, multer, sharp, bookCtrl.modifyBook); 
router.post('/', auth, multer, sharp, bookCtrl.createBook); 
router.get('/bestrating', bookCtrl.getBestRatingBook);
router.get('/:id', bookCtrl.getOneBook);
router.get('/', bookCtrl.getAllBook);

module.exports = router;