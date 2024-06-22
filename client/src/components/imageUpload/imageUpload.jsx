import React, { useState } from 'react';
import upload from '../../utils/upload';

const ImageUploader = ({ onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    setUploading(true);

    try {
      const uploads = Array.from(files).map(file => upload(file)); // Upload all files in parallel
      const urls = await Promise.all(uploads);
      onUploadComplete(urls); // Send all URLs back at once
      setUploading(false);
    } catch (err) {
      console.error('Error uploading files:', err);
      setUploading(false);
    }
  };

  return (
    <div className="image-uploader">
      {uploading ? <p>Uploading...</p> : (
        <label htmlFor="image-upload">Upload Image(s)</label>
      )}
      <input
        id="image-upload"
        type="file"
        multiple
        onChange={handleFileChange}
        disabled={uploading}
      />
    </div>
  );
};

export default ImageUploader;
