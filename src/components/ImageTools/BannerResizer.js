import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ToolCard = styled.div`
  background-color: var(--discord-darker);
  border: 1px solid var(--discord-dark);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
`;

const DropzoneArea = styled.div`
  border: 2px dashed ${props => props.isDragActive ? 'var(--discord-blurple)' : 'var(--discord-interactive-muted)'};
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.isDragActive ? 'rgba(88, 101, 242, 0.1)' : 'var(--discord-light)'};
  
  &:hover {
    border-color: var(--discord-blurple);
    background-color: rgba(88, 101, 242, 0.05);
  }
`;

const DropzoneText = styled.p`
  font-size: 16px;
  color: var(--discord-text-normal);
  margin-bottom: 8px;
`;

const DropzoneSubtext = styled.p`
  font-size: 14px;
  color: var(--discord-text-muted);
`;

const PreviewSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 24px;
`;

const PreviewCard = styled.div`
  background-color: var(--discord-darker);
  border: 1px solid var(--discord-dark);
  border-radius: 8px;
  padding: 20px;
`;

const PreviewTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--discord-header-primary);
  margin-bottom: 12px;
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 120px;
  background-color: var(--discord-light);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ImageInfo = styled.div`
  margin-top: 12px;
  font-size: 14px;
  color: var(--discord-text-muted);
`;

const ControlsSection = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 16px;
  flex-wrap: wrap;
`;

const Select = styled.select`
  background-color: var(--discord-darker);
  border: 1px solid var(--discord-dark);
  border-radius: 4px;
  color: var(--discord-text-normal);
  padding: 8px 12px;
  font-size: 14px;
  font-family: inherit;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.primary {
    background-color: var(--discord-blurple);
    color: var(--discord-white);
    
    &:hover {
      background-color: #4752C4;
    }
    
    &:disabled {
      background-color: var(--discord-interactive-muted);
      cursor: not-allowed;
    }
  }
  
  &.secondary {
    background-color: var(--discord-lighter);
    color: var(--discord-text-normal);
    
    &:hover {
      background-color: #484C52;
    }
  }
`;

function BannerResizer() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [resizeMode, setResizeMode] = useState('cover');
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.bmp']
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            setOriginalImage({
              src: e.target.result,
              width: img.width,
              height: img.height,
              size: file.size,
              name: file.name
            });
            processImage(img);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  });

  const processImage = (img) => {
    setIsProcessing(true);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Discord banner dimensions
    const targetWidth = 600;
    const targetHeight = 240;
    
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    
    // Calculate dimensions based on resize mode
    let drawWidth, drawHeight, drawX, drawY;
    
    if (resizeMode === 'cover') {
      // Cover mode: fill the entire banner, crop if necessary
      const scale = Math.max(targetWidth / img.width, targetHeight / img.height);
      drawWidth = img.width * scale;
      drawHeight = img.height * scale;
      drawX = (targetWidth - drawWidth) / 2;
      drawY = (targetHeight - drawHeight) / 2;
    } else if (resizeMode === 'contain') {
      // Contain mode: fit entire image, add padding if necessary
      const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
      drawWidth = img.width * scale;
      drawHeight = img.height * scale;
      drawX = (targetWidth - drawWidth) / 2;
      drawY = (targetHeight - drawHeight) / 2;
      
      // Fill background with dark color
      ctx.fillStyle = '#2C2F33';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    } else {
      // Stretch mode: stretch to exact dimensions
      drawWidth = targetWidth;
      drawHeight = targetHeight;
      drawX = 0;
      drawY = 0;
    }
    
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    
    const processedDataUrl = canvas.toDataURL('image/png');
    setProcessedImage({
      src: processedDataUrl,
      width: targetWidth,
      height: targetHeight
    });
    
    setIsProcessing(false);
  };

  const handleResizeModeChange = (e) => {
    setResizeMode(e.target.value);
    if (originalImage) {
      const img = new Image();
      img.onload = () => processImage(img);
      img.src = originalImage.src;
    }
  };

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.download = 'discord-banner-600x240.png';
      link.href = processedImage.src;
      link.click();
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Container className="fade-in">
      <ToolCard>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <DropzoneArea isDragActive={isDragActive}>
            <DropzoneText>
              {isDragActive ? 'Drop your image here!' : 'Drag & drop an image, or click to select'}
            </DropzoneText>
            <DropzoneSubtext>
              Supports JPG, PNG, GIF, WebP, and BMP files
            </DropzoneSubtext>
          </DropzoneArea>
        </div>

        {originalImage && (
          <ControlsSection>
            <label>
              Resize Mode:
              <Select value={resizeMode} onChange={handleResizeModeChange}>
                <option value="cover">Cover (crop to fit)</option>
                <option value="contain">Contain (fit with padding)</option>
                <option value="stretch">Stretch (may distort)</option>
              </Select>
            </label>
          </ControlsSection>
        )}
      </ToolCard>

      {originalImage && (
        <PreviewSection>
          <PreviewCard>
            <PreviewTitle>Original Image</PreviewTitle>
            <ImagePreview>
              <PreviewImage src={originalImage.src} alt="Original" />
            </ImagePreview>
            <ImageInfo>
              Dimensions: {originalImage.width} × {originalImage.height}<br />
              Size: {formatFileSize(originalImage.size)}
            </ImageInfo>
          </PreviewCard>

          <PreviewCard>
            <PreviewTitle>Discord Banner (600×240)</PreviewTitle>
            <ImagePreview>
              {isProcessing ? (
                <div className="pulse">Processing...</div>
              ) : processedImage ? (
                <PreviewImage src={processedImage.src} alt="Processed" />
              ) : null}
            </ImagePreview>
            {processedImage && (
              <>
                <ImageInfo>
                  Dimensions: {processedImage.width} × {processedImage.height}<br />
                  Format: PNG (Discord compatible)
                </ImageInfo>
                <ControlsSection>
                  <Button className="primary" onClick={downloadImage}>
                    Download Banner
                  </Button>
                </ControlsSection>
              </>
            )}
          </PreviewCard>
        </PreviewSection>
      )}
    </Container>
  );
}

export default BannerResizer;