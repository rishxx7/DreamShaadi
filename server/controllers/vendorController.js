const Vendor = require("../models/Vendor");


// ADD VENDOR
const addVendor = async (req, res) => {

  try {

    const vendor = await Vendor.create(req.body);

    res.status(201).json({
      message: "Vendor added successfully",
      vendor,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET ALL VENDORS
const getVendors = async (req, res) => {

  try {

    const vendors = await Vendor.find();

    res.status(200).json(vendors);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET SINGLE VENDOR
const getVendorById = async (req, res) => {

  try {

    const vendor = await Vendor.findById(
      req.params.id
    );

    res.status(200).json(vendor);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// DELETE VENDOR
const deleteVendor = async (req, res) => {

  try {

    await Vendor.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Vendor deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// UPDATE VENDOR
const updateVendor = async (req, res) => {

  try {

    const updatedVendor =
      await Vendor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json({
      message: "Vendor updated successfully",
      updatedVendor,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  addVendor,
  getVendors,
  getVendorById,
  deleteVendor,
  updateVendor,
};