import mongoose from 'mongoose';

interface ICategory {
  name: string;
  bgcolor: {
    hex: string;
  };
  icon: {
    url: string;
  };
}

const categoriesSchema = new mongoose.Schema<ICategory>(
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
          validator: function (hex: string) {
            return /^#[0-9A-F]{6}$/i.test(hex);
          },
          message: (props: { value: string }) => `${props.value} is not a valid hex color code!`,
        },
      },
    },
    icon: {
      url: {
        type: String,
        required: [true, 'Icon URL is required.'],
        validate: {
          validator: function (url: string) {
            return /^(http|https):\/\/[^\s$.?#].[^\s]*$/.test(url);
          },
          message: (props: { value: string }) => `${props.value} is not a valid URL!`,
        },
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Category = mongoose.model<ICategory>('Category', categoriesSchema);

export default Category;
