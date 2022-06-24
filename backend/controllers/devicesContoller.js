const asyncHandler = require("express-async-handler");

const Device = require("../models/deviceModel");

// GET DEVICES
// @route GET api/devices
// @access Private
const getDevices = asyncHandler(async (req, res) => {
  const devices = await Device.find().sort({ model: 1 });

  res.status(200).json(devices);
});

// GET RENTED DEVICES BY USER
// @route GET api/devices/display-rented
// @access Private
const displayRentedDevices = asyncHandler(async (req, res) => {
  const devices = await Device.find({ rentedBy: req.user.id }).sort({
    model: 1,
  });

  res.status(200).json(devices);
});

// CREATE NEW DEVICE
// @route POST api/devices
// @access Private
const addNewDevice = asyncHandler(async (req, res) => {
  if (
    !req.body.manufacturer ||
    !req.body.model ||
    !req.body.platform ||
    !req.body.serial_number
  ) {
    res.status(400);
    throw new Error("Please fill required fields");
  }

  const device = await Device.create({
    build_number: req.body.build_number,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    platform: req.body.platform,
    serial_number: req.body.serial_number,
    version: req.body.version,
  });

  res.status(200).json(device);
});

// SEND TO REPAIR
// @route PUT api/devices/repair/:id
// @access Private
const sendToRepair = asyncHandler(async (req, res) => {
  const device = await Device.findById(req.params.id);

  if (!device) {
    res.status(400);
    throw new Error("Device not found");
  }

  if (device.rentedBy === "") {
    const deviceInRepair = await Device.findByIdAndUpdate(
      req.params.id,
      { availability: "Not available", status: "Sent for repair" },
      {
        new: true,
      }
    );

    res.status(200).json(deviceInRepair);
  } else {
    res.status(400);
    throw new Error(`Rented device can't be sent for repair`);
  }
});

// RENT DEVICE
// @route PUT api/devices/rent/:id
// @access Private
const rentDevice = asyncHandler(async (req, res) => {
  const device = await Device.findById(req.params.id);

  if (!device) {
    res.status(400);
    throw new Error("Device not found");
  }

  const rentedDevice = await Device.findByIdAndUpdate(
    req.params.id,
    { availability: "Rented", rentedBy: req.user.id },
    {
      new: true,
    }
  );

  res.status(200).json(rentedDevice);
});

// RETURN DEVICE
// @route PUT api/devices/return/:id
// @access Private
const returnDevice = asyncHandler(async (req, res) => {
  const device = await Device.findById(req.params.id);

  if (!device) {
    res.status(400);
    throw new Error("Device not found");
  }

  const returnedDevice = await Device.findByIdAndUpdate(
    req.params.id,
    { availability: "Available", rentedBy: "" },
    {
      new: true,
    }
  );
  res.status(200).json(returnedDevice);
});

// DELETE DEVICE
// @route DELETE api/devices/:id
// @access Private
const deleteDeviceFromAssortment = asyncHandler(async (req, res) => {
  const device = await Device.findById(req.params.id);

  if (!device) {
    res.status(400);
    throw new Error("Device not found");
  }

  if (device.rentedBy === "" && req.user.role === "administrator") {
    await device.remove();

    res.status(200).json({
      message: `Deleting device ${req.params.id} from product range. Device specification: ${device}`,
    });
  } else if (req.user.role !== "administrator") {
    res.status(400);
    throw new Error(`Not authorized`);
  } else {
    res.status(400);
    throw new Error(`Rented device can't be deleted from product range`);
  }
});

module.exports = {
  getDevices,
  addNewDevice,
  sendToRepair,
  rentDevice,
  returnDevice,
  deleteDeviceFromAssortment,
  displayRentedDevices,
};
