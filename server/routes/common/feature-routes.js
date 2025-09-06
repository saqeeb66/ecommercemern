const express = require("express");

const {
  addFeatureImage,
  getFeatureImages,
  removeFeatureImage, // Add this
} = require("../../controllers/common/feature-controller");

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);

// Add this DELETE route for removing feature images by id
router.delete("/remove/:id", removeFeatureImage);

module.exports = router;
