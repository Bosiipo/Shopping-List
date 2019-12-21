import { Router } from 'express';
import Item from '../../models/Item';

const router = Router();

// Item Controller
import ItemController from '../../controllers/item.controller';

router.get('/', ItemController.fetchAllItems);
router.post('/', ItemController.createItem);

// ItemController.createItem

// (req, res) => {
//     const newItem = Item.create({ name });
//     return res.status(200).json({
//       status: 'success',
//       message: 'Successfully posted Item!',
//       // name,
//       // id: newItem.id
//       newItem
//     });
//   }

router.delete('/:id', ItemController.deleteItem);

// (req, res) => {
//     Item.findAll({ order: [['createdAt', 'DESC']] }).then(items =>
//       res.json(items)
//     );
//   }

export default router;
