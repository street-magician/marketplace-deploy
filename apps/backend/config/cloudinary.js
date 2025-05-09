const cloudinary = require('cloudinary').v2;

// Log environment variable status
console.log('Cloudinary config:');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Present' : 'Missing');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Present' : 'Missing');

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Test connection
cloudinary.api.ping((err, result) => {
  if (err) {
    console.error('Cloudinary ping failed:', err.message);
  } else {
    console.log('Cloudinary connected:', result);
  }
});

module.exports = cloudinary;
