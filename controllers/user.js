// Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/user');

// User signup
exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({message: 'Champs manquants !'});
    };

    // Validate email format
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Format email invalide !' });
    };

    // Hash password before saving
    bcrypt.hash(password, 10)
        .then(hash => {
            // Create new user with hashed password
            const user = new User({
                email: email,
                password: hash
            });
        // Save user to database
        user.save()
            .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));    
};

// User login
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({message: 'Champs manquants !'});
    };

    // Validate email format
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Format email invalide !' });
    };
    
    // Find user by email
    User.findOne({email: email})
        .then(user => {
            if (!user) {
                res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte !'});
            } else {
                // Compare provided password with stored hash
                bcrypt.compare(password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte !'});
                        } else {
                            // Generate JWT token
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    process.env.JWT_SECRET_KEY,
                                    { expiresIn: '24h' }
                                )
                            });
                        };
                    })
                    .catch(error =>res.status(500).json({error}));
            };
        })
        .catch(error => res.status(500).json({error}));
};