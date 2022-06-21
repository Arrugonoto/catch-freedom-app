const express = require("express");
const router = express.Router();
const {
  getDevices,
  addNewDevice,
  sendToRepair,
  rentDevice,
  returnDevice,
  deleteDeviceFromAssortment,
  displayRentedDevices,
} = require("../controllers/devicesContoller");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getDevices).post(protect, addNewDevice);

router.get("/display-rented", protect, displayRentedDevices);

router.put("/repair/:id", protect, sendToRepair);

router.put("/rent/:id", protect, rentDevice);

router.put("/return/:id", protect, returnDevice);

router.delete("/:id", protect, deleteDeviceFromAssortment);

module.exports = router;
