const express = require("express");

const {
  addVendor,
  getVendors,
  getVendorById,
  deleteVendor,
  updateVendor,
} = require("../controllers/vendorController");

const router = express.Router();

router.post("/", addVendor);

router.get("/", getVendors);

router.get("/:id", getVendorById);

router.delete("/:id", deleteVendor);

router.put("/:id", updateVendor);

module.exports = router;