import React, { useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext.jsx';

function ArtStyleTransfer() {
  const [contentImage, setContentImage] = useState(null);
  const [styleImage, setStyleImage] = useState(null);
  const [contentFile, setContentFile] = useState(null);
  const [styleFile, setStyleFile] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);


  const handleImageChange = (e, imageSetter, fileSetter) => {
    const file = e.target.files[0];
    if (file) {
      imageSetter(URL.createObjectURL(file)); 
      fileSetter(file);
    }
  };

  const handleApplyStyle = async () => {
    if (!contentFile || !styleFile) return;

    setIsProcessing(true);

    const formData = new FormData();
    formData.append('ContentImage', contentFile);
    formData.append('StyleImage', styleFile);

    try {
      const response = await axios.post('https://image-g3epahfrhjghgpfs.switzerlandnorth-01.azurewebsites.net/api/Generation/stylize-image', formData, {
        responseType: 'blob',
      });

      const resultUrl = URL.createObjectURL(response.data);
      setResultImage(resultUrl);
    } catch (error) {
      console.error('Error applying style:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-white fw-bold">Art Style Transfer</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card text-center h-100">
            <div className="card-header">Content Image</div>
            <div className="card-body">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => handleImageChange(e, setContentImage, setContentFile)}
              />
              {contentImage && (
                <img src={contentImage} alt="content" className="img-fluid mt-3 rounded" />
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center h-100">
            <div className="card-header">Style Image</div>
            <div className="card-body">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => handleImageChange(e, setStyleImage, setStyleFile)}
              />
              {styleImage && (
                <img src={styleImage} alt="style" className="img-fluid mt-3 rounded" />
              )}
              {contentImage && styleImage && (
                <button
                  className="btn btn-primary mt-4"
                  onClick={handleApplyStyle}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Applying Style...' : 'Apply Style'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center h-100">
            <div className="card-header">Result Image</div>
            <div className="card-body">
              {resultImage ? (
                <img src={resultImage} alt="result" className="img-fluid rounded" />
              ) : (
                <div className="text-muted">
                  {contentImage && styleImage
                    ? 'Click "Apply Style" to generate result'
                    : 'Upload both images to see the result'}
                </div>
              )}
              <div className="mt-3" style={{ minHeight: '200px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtStyleTransfer;
