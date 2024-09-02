import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  date: {
    type: Date,
    required: [true, 'field is required. e.g. 2022-04-28'],
  },
  time: {
    type: String,
    required: [true, 'field is required. e.g. 14:00'],
  },
  userEmail: {
    type: String,
    required: [true, 'field is required.'],
    validate: {
      validator: function (email: string) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: (props: { value: any }) => `${props.value} is not a valid email!`,
    },
  },
  userName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: [true, 'Booking status is required.'],
    enum: {
      values: ['confirmed', 'pending', 'cancelled'],
      message: '{VALUE} is not supported',
    },
  },
});

export const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;