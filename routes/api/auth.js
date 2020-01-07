const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('../../config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

router.post('/', (req, res) => {
    const { email, password } = req.body;
    
    // Simple validation
    if(!email || !password){
        return res.status(400).json({message: 'Please enter all fields!'});
    } 

    // Check for existing user
    User.findOne({ where: { email }})
    .then(user => {
        if (!user) return res.status(400).json({message: 'User does not exist!'});

        // Validate password
        bcrypt.compare(password, user.password)
         .then(isMatch => {
            if (!isMatch) return res.status(400).json({message: 'Invalid credentials!'})
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

});

router.get('/user', auth, (req, res) => {
    // const { id, name, email } = req.user;

    User.findOne({
        where: { id: req.user.id }, 
        attributes: {
        include: ['id', 'name', 'email'],
        exclude: ['password']
    }})
    .then(user => res.json(user));
});


module.exports = router;

