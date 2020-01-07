const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

router.get('/', (req, res) => {
    const items = Item.findAll({ order: [['createdAt', 'DESC']] });
    items.then(items => res.json(items));
});

router.post('/', auth, (req, res) => {
    const { name } = req.body;
    const newItem = Item.create({ name });
    newItem.then(item => res.json(item));
});


router.delete('/:id', auth, (req, res) => {
    const { id } = req.params;
    Item.destroy({ where: { id } });
    return res.json({
    status: 'success',
    message: 'Successfully deleted item!'
    });
});


module.exports = router;
