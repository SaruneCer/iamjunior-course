import express from 'express';
import Booking from '../schemas/Booking';

const router = express.Router();

router.post('/', async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({
      message: 'Error creating booking',
      error: (error as Error)?.message ?? error,
    });
  }
});

router.get('/user/:email', async (req, res) => {
  try {
    const userBookings = await Booking.find({ userEmail: req.params.email });
    if (userBookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }
    res.json(userBookings);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving bookings',
      error: (error as Error)?.message ?? error,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (deletedBooking) {
      res.status(200).json({ message: 'Booking deleted successfully' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting booking',
      error: (error as Error)?.message ?? error,
    });
  }
});

export default router;
