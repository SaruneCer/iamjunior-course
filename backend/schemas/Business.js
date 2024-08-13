const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'Image URL is required.'],
    validate: {
      validator: function (url) {
        return /^(http|https):\/\/[^\s$.?#].[^\s]*$/.test(url);
      },
      message: (props) => `${props.value} is not a valid URL!`
    }
  }
});

const BusinessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Business name is required.'],
    trim: true
  },
  about: {
    type: String,
    required: [true, 'Business description is required.'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Business address is required.'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Business category is required.'],
    trim: true
  },
  contactPerson: {
    type: String,
    required: [true, 'Contact person is required.'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    match: [/.+\@.+\..+/, 'Please provide a valid email address.'],
    trim: true
  },
  images: [ImageSchema]
}, {
  versionKey: false,
  timestamps: true
});

const Business = mongoose.model('Business', BusinessSchema);
module.exports = Business;
