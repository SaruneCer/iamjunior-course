const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Business name is required."],
    },
    about: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      required: [true, "Business address is required."],
    },
    category: {
      type: String,
      required: [true, "Business category is required."],
      trim: true,
    },
    contactPerson: {
      type: String,
      required: [true, "Contact person is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      match: [/.+\@.+\..+/, "Please provide a valid email address."],
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

const Business = mongoose.model("Business", BusinessSchema);
module.exports = Business;
