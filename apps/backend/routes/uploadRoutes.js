const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'marketplace-images',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      console.error('❌ No file uploaded');
      return res.status(400).json({ error: 'No image uploaded' });
    }

    console.log('✅ Uploaded file info:', req.file);

    const imageUrl = req.file.path || req.file.secure_url;

    if (!imageUrl) {
      return res.status(500).json({ error: 'Failed to retrieve image URL from Cloudinary' });
    }

    res.status(200).json({ imageUrl });
  } catch (err) {
    console.error('❌ Upload error:', JSON.stringify(err, null, 2)); 
    res.status(500).json({ error: 'Image upload failed', detail: err.message || 'Unknown error' });
  }  
});

module.exports = router;
