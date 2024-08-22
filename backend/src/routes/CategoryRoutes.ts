import express from 'express';
import Category from '../schemas/Category';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error });
  }
});

router.post('/', async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error adding new category', error: error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error editing category', error: error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    res.json(deletedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error deleting category', error: error });
  }
});

export default router;
