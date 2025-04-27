const Feature = require("../../models/Feature");
const cloudinary = require("cloudinary").v2;
const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    console.log(image, "image");

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the image by MongoDB ID
    const featureImage = await Feature.findById(id);

    if (!featureImage) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    const imageUrl = featureImage.image;

    // Extract Cloudinary public_id from the image URL
    const publicId = imageUrl.split('/').pop().split('.')[0];

    // Remove from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Remove from MongoDB
    await Feature.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to delete image" });
  }
};

module.exports = { addFeatureImage, getFeatureImages, deleteFeatureImage };
