const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema(
  {
    build_number: {
      type: Number,
      required: [true, "Please enter build number"],
    },
    manufacturer: {
      type: String,
      required: [true, "Please enter manufacturer name"],
    },
    model: {
      type: String,
      required: [true, "Please enter device model"],
    },
    platform: {
      type: String,
      required: [true, "Please enter device platform(OS)"],
    },
    serial_number: {
      type: String,
      required: [true, "Please enter devices serial number"],
    },
    version: {
      type: Number,
      required: [true, "Please enter device version"],
    },
    availability: {
      type: String,
      default: "Available",
    },
    status: {
      type: String,
      default: "OK",
    },
    rentedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Device", deviceSchema);
