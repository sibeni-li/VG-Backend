// Imports
const Book = require('../models/book');
const fs = require('fs');

// Create a rating for a book
exports.createRatingBook = (req, res, next) =>{
    // Verify if it is a number
    if (!Number.isInteger(req.body.rating)) {
        res.status(401).json({message: 'La note doit être un nombre'});
    };
    // Validate rating
    if (req.body.rating < 0 || req.body.rating > 5) {
        res.status(401).json({message: 'La note doit être comprise entre 0 et 5'});
    };

    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (!book) {
                return res.status(404).json({error});
            };
            const bookRating = book.ratings;
            // Check if user has already rated the book
            if ( bookRating.find((rating) => rating.userId === req.auth.userId)) {
                res.status(401).json({message: 'Vous avez déjà noté ce livre'});
            } else {
                // Add new rating
                bookRating.push({
                    userId: req.auth.userId,
                    grade: req.body.rating
                });

                // Calculate new average rating
                const averageRating = bookRating.reduce((acc, currentValue) => acc + currentValue.grade, 0);
                book.averageRating = averageRating / bookRating.length;

                // Save updated book
                book.save()
                    .then(() => res.status(200).json(book))
                    .catch(error => res.status(400).json({ error }));
            };
        })
        .catch(error => res.status(404).json({ error }));
};

// Delete a book
exports.deleteBook = (req, res, next) => {
    Book.findOne({_id: req.params.id})
        .then(book => {
            if (!book) {
                return res.status(404).json({error});
            };
            if(book.userId != req.auth.userId) {
                res.status(401).json({message: 'Non authorisé'});
            } else {
                // Delete image file and book record
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Livre supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
};

// Modify a book
exports.modifyBook = (req, res, next) => {
    
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (!book) {
                return res.status(404).json({error});
            };
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Non authorisé'});
            } else {
                // Handle book object with or without new file
                let bookObject = {};
                if ( req.file) {
                    // Delete old image if new one is uploaded
                    const filename = book.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${ filename }`, err => {
                        if (err) console.log(err);
                    });
                    bookObject = {
                        ...JSON.parse(req.body.book),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                        userId: req.auth.userId
                    }
                } else { 
                    bookObject = {
                        ...req.body,
                        userId: req.auth.userId
                    };
                };
                // Update book
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                    .then(() => res.status(200).json({message : 'Livre modifié!'}))
                    .catch(error => res.status(401).json({ error }));
                }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Create a new book
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        ratings: [],
        averageRating: 0
    });
    
    book.save()
        .then(() => res.status(201).json({ message: 'Livre ajouté avec succès'}))
        .catch(error => res.status(400).json({ error }));
};

// Get top 3 rated books
exports.getBestRatingBook = (req, res,next) => {
    Book.find()
        .then((books) => {
            if (!books) {
                return res.status(404).json({error});
            };
            const bestAverageRating = books.sort((a, b) => b.averageRating - a.averageRating).slice(0,3);
            res.status(200).json(bestAverageRating);
        })
        .catch(error => res.status(400).json({ error }));
};

// Get a single book
exports.getOneBook = (req, res, next) => {
    Book.findOne({_id: req.params.id})
        .then(book => {
            if (!book) {
                return res.status(404).json({error});
            };
            res.status(200).json(book)})
        .catch(error => res.status(404).json({ error }));
};

// Get all books
exports.getAllBook = (req, res, next) => {
    Book.find()
        .then(books => {
            if (!books) {
                return res.status(404).json({error});
            };
            res.status(200).json(books)})
        .catch(error => res.status(400).json({ error }));
};