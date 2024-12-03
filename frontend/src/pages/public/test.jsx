import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle file input change
  const handleFileChange = (event) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      setError('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImageUrl(response.data.url); // Get the Cloudinary image URL
      console.log('Uploaded Image URL:', response.data.url); // Log the URL
      setError('');
    } catch (err) {
      setError('Failed to upload image.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Image to Cloudinary</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl && (
        <div>
          <h3>Uploaded Image</h3>
          <img src={imageUrl} alt="Uploaded" style={{ width: '300px' }} />
          <p>Image URL: <a href={`${imageUrl}`}></a>{imageUrl}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
