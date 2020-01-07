const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');

// User Model
const User = require('../../models/User');

router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    
    // Simple validation
    if(!name || !email || !password){
        return res.status(400).json({message: 'Please enter all fields!'});
    } 

    // Check for existing user
    User.findOne({ where: { email }})
    .then(user => {
        if (user) return res.status(400).json({message: 'User already exists!'});

        // Create an object instance of the database object schema
        const newUser = new User({
            name,
            email,
            password
        });

        // Create hash and salt
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => {
                    jwt.sign(
                        {id: user.id},
                        config.secret,
                        {expiresIn: 3600},
                        (err, token) => {
                            if (err) throw new err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
            })
        })
    })

});

module.exports = router;

