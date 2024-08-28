import express from 'express';
import Business from '../schemas/Business';
import authMiddleware from '../../src/middlewares/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching businesses', error: error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (business) {
      res.json(business);
    } else {
      res.status(404).send('Business not found');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting business by id', error: (error as Error).message });
  }
});

router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const businesses = await Business.find({
      category: new RegExp(`^${category}$`, 'i'),
    });
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching businesses by categories', error: error });
  }
});

router.post('/', async (req, res) => {
  const newBusiness = new Business(req.body);
  try {
    const savedBusiness = await newBusiness.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    res.status(400).json({ message: 'Error adding new business', error: error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedBusiness = await Business.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBusiness);
  } catch (error) {
    res.status(400).json({ message: 'Error editing business info', error: error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedBusiness = await Business.findByIdAndDelete(req.params.id);
    if (deletedBusiness) {
      res.json({ message: 'Business deleted successfully', deletedBusiness });
    } else {
      res.status(404).json({ message: 'Business not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting business', error: (error as Error).message });
  }
});

router.get('/:businessId/bookings/date/:date', async (req, res) => {
  try {
    const { businessId, date } = req.params;
    const bookings = await Business.find({ businessId, date });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings for specific date', error: error });
  }
});

export default router;
