const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required.'],
      trim: true,
    },
    bgcolor: {
      hex: {
        type: String,
        required: [true, 'Background color is required.'],
        validate: {
          validator: function (hex) {
            return /^#[0-9A-F]{6}$/i.test(hex);
          },
          message: (props) => `${props.value} is not a valid hex color code!`,
        },
      },
    },
    icon: {
      url: {
        type: String,
        required: [true, 'Icon URL is required.'],
        validate: {
          validator: function (url) {
            return /^(http|https):\/\/[^\s$.?#].[^\s]*$/.test(url);
          },
          message: (props) => `${props.value} is not a valid URL!`,
        },
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Category = mongoose.model('Category', categoriesSchema);
module.exports = Category;
