const express = require("express");

const multer = require("multer");

const cloudinary =
  require("../config/cloudinary");

const router = express.Router();

const storage = multer.diskStorage({});

const upload = multer({
  storage,
});

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {

    try {

      const result =
        await cloudinary.uploader.upload(
          req.file.path
        );

      res.status(200).json({
        imageUrl: result.secure_url,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

module.exports = router;