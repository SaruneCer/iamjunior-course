import mongoose from 'mongoose';

interface IBusiness {
  name: string;
  about?: string;
  address: string;
  category: string;
  contactPerson: string;
  email: string;
  images: string[];
}

const BusinessSchema = new mongoose.Schema<IBusiness>(
  {
    name: {
      type: String,
      required: [true, 'Business name is required.'],
    },
    about: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      required: [true, 'Business address is required.'],
    },
    category: {
      type: String,
      required: [true, 'Business category is required.'],
      trim: true,
    },
    contactPerson: {
      type: String,
      required: [true, 'Contact person is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/.+@.+\..+/, 'Please provide a valid email address.'],
      trim: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Business = mongoose.model<IBusiness>('Business', BusinessSchema);

export default Business;

