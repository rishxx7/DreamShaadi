const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 4.5,
    },
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model(
  "Vendor",
  vendorSchema
);

module.exports = Vendor;