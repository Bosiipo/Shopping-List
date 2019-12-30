import { Router } from 'express';
import Item from '../../models/Item';

const router = Router();

// Item Controller
import ItemController from '../../controllers/item.controller';

router.get('/', ItemController.fetchAllItems);
router.post('/', ItemController.createItem);
router.delete('/:id', ItemController.deleteItem);

export default router;
