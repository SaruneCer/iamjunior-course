import express from 'express';
import cors from 'cors';
import { PORT, connectToDb } from './db';

import userRoutes from './routes/UserRoutes';
import authRoutes from './routes/authRoutes';
import businessesRoutes from './routes/BusinessRoutes';
import categoryRoutes from './routes/CategoryRoutes';
import bookingRoutes from './routes/BookingRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/business', businessesRoutes);
app.use('/category', categoryRoutes);
app.use('/booking', bookingRoutes);

connectToDb().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
