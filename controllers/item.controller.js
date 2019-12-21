import Item from '../models/Item';

class ItemController {
  static async fetchAllItems(req, res) {
    try {
      const items = await Item.findAll({ order: [['createdAt', 'DESC']] });
      return res.status(200).json(items);
    } catch (error) {
      res.status(500).json({
        status: error,
        message: error.message
      });
    }
  }

  static async createItem(req, res) {
    try {
      const { name } = req.body;
      const newItem = await Item.create({ name });
      return res.status(200).json(newItem);
    } catch (error) {
      res.status(500).json({
        status: error,
        message: error.message
      });
    }
  }

  static async deleteItem(req, res) {
    try {
      const { id } = req.params;
      await Item.destroy({ where: { id } });
      return res.status(200).json({
        status: 'success',
        message: 'Successfully deleted item!'
      });
    } catch (error) {
      res.status(500).json({
        status: error,
        message: error.message
      });
    }
  }
}

export default ItemController;
