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

const ProcessingSection = styled.div`
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

const EmojiPreview = styled.div`
  width: 128px;
  height: 128px;
  background-color: var(--discord-light);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 0 auto 16px;
  border: 2px solid var(--discord-dark);
  position: relative;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ImageInfo = styled.div`
  font-size: 14px;
  color: var(--discord-text-muted);
  text-align: center;
`;

const ControlsSection = styled.div`
  margin-top: 16px;
`;

const ControlGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--discord-text-normal);
  margin-bottom: 8px;
`;

const Select = styled.select`
  width: 100%;
  background-color: var(--discord-darker);
  border: 1px solid var(--discord-dark);
  border-radius: 4px;
  color: var(--discord-text-normal);
  padding: 8px 12px;
  font-size: 14px;
  font-family: inherit;
`;

const Slider = styled.input`
  width: 100%;
  margin: 8px 0;
`;

const SliderValue = styled.span`
  font-size: 12px;
  color: var(--discord-text-muted);
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 8px;
  
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
  
  &.success {
    background-color: var(--discord-green);
    color: var(--discord-white);
    
    &:hover {
      background-color: #3BA55D;
    }
  }
  
  &.warning {
    background-color: var(--discord-yellow);
    color: var(--discord-black);
    
    &:hover {
      background-color: #F0C040;
    }
  }
`;

const StatusIndicator = styled.div`
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 12px;
  
  &.success {
    background-color: rgba(87, 242, 135, 0.1);
    color: var(--discord-green);
    border: 1px solid var(--discord-green);
  }
  
  &.warning {
    background-color: rgba(254, 231, 92, 0.1);
    color: var(--discord-yellow);
    border: 1px solid var(--discord-yellow);
  }
  
  &.error {
    background-color: rgba(237, 66, 69, 0.1);
    color: var(--discord-red);
    border: 1px solid var(--discord-red);
  }
`;

function EmojiMaker() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [quality, setQuality] = useState(0.9);
  const [format, setFormat] = useState('png');
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileSize, setFileSize] = useState(0);

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
              element: img,
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
    
    // Discord emoji size
    canvas.width = 128;
    canvas.height = 128;
    
    // Clear canvas with transparent background
    ctx.clearRect(0, 0, 128, 128);
    
    // Calculate dimensions to fit within 128x128 while maintaining aspect ratio
    const scale = Math.min(128 / img.width, 128 / img.height);
    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;
    
    // Center the image
    const x = (128 - scaledWidth) / 2;
    const y = (128 - scaledHeight) / 2;
    
    ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
    
    // Convert to desired format
    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    const dataUrl = canvas.toDataURL(mimeType, quality);
    
    // Calculate file size
    const base64Length = dataUrl.split(',')[1].length;
    const sizeInBytes = (base64Length * 3) / 4;
    
    setProcessedImage(dataUrl);
    setFileSize(sizeInBytes);
    setIsProcessing(false);
  };

  const handleQualityChange = (e) => {
    const newQuality = parseFloat(e.target.value);
    setQuality(newQuality);
    if (originalImage) {
      processImage(originalImage.element);
    }
  };

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
    if (originalImage) {
      processImage(originalImage.element);
    }
  };

  const downloadEmoji = () => {
    if (processedImage) {
      const link = document.createElement('a');
      const extension = format === 'jpg' ? 'jpg' : 'png';
      link.download = `discord-emoji-128x128.${extension}`;
      link.href = processedImage;
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

  const getStatusInfo = () => {
    if (!processedImage) return null;
    
    const maxSize = 256 * 1024; // 256KB
    
    if (fileSize <= maxSize) {
      return {
        type: 'success',
        message: `✅ Perfect! File size: ${formatFileSize(fileSize)} (under 256KB limit)`
      };
    } else {
      return {
        type: 'warning',
        message: `⚠️ File too large: ${formatFileSize(fileSize)} (over 256KB limit)`
      };
    }
  };

  const status = getStatusInfo();

  return (
    <Container className="fade-in">
      <ToolCard>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <DropzoneArea isDragActive={isDragActive}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>😀</div>
            <p style={{ fontSize: '16px', color: 'var(--discord-text-normal)', marginBottom: '8px' }}>
              {isDragActive ? 'Drop your image here!' : 'Drag & drop an image, or click to select'}
            </p>
            <p style={{ fontSize: '14px', color: 'var(--discord-text-muted)' }}>
              Create Discord emojis (128×128, under 256KB)
            </p>
          </DropzoneArea>
        </div>
      </ToolCard>

      {originalImage && (
        <ProcessingSection>
          <PreviewCard>
            <PreviewTitle>Original Image</PreviewTitle>
            <EmojiPreview>
              <PreviewImage src={originalImage.src} alt="Original" />
            </EmojiPreview>
            <ImageInfo>
              {originalImage.width} × {originalImage.height}<br />
              {formatFileSize(originalImage.size)}
            </ImageInfo>
          </PreviewCard>

          <PreviewCard>
            <PreviewTitle>Discord Emoji (128×128)</PreviewTitle>
            <EmojiPreview>
              {isProcessing ? (
                <div className="pulse">Processing...</div>
              ) : processedImage ? (
                <PreviewImage src={processedImage} alt="Emoji" />
              ) : null}
            </EmojiPreview>
            {processedImage && (
              <ImageInfo>
                128 × 128 pixels<br />
                {formatFileSize(fileSize)}
              </ImageInfo>
            )}

            {status && (
              <StatusIndicator className={status.type}>
                {status.message}
              </StatusIndicator>
            )}

            <ControlsSection>
              <ControlGroup>
                <Label>Output Format:</Label>
                <Select value={format} onChange={handleFormatChange}>
                  <option value="png">PNG (recommended)</option>
                  <option value="jpg">JPEG (smaller file)</option>
                </Select>
              </ControlGroup>

              {format === 'jpg' && (
                <ControlGroup>
                  <Label>
                    Quality: <SliderValue>{Math.round(quality * 100)}%</SliderValue>
                  </Label>
                  <Slider
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={quality}
                    onChange={handleQualityChange}
                  />
                </ControlGroup>
              )}

              <Button 
                className={status?.type === 'success' ? 'success' : status?.type === 'warning' ? 'warning' : 'primary'}
                onClick={downloadEmoji}
                disabled={!processedImage}
              >
                {status?.type === 'success' ? '✅ Download Emoji' : 
                 status?.type === 'warning' ? '⚠️ Download (Too Large)' : 
                 'Download Emoji'}
              </Button>
              
              {status?.type === 'warning' && (
                <div style={{ fontSize: '12px', color: 'var(--discord-text-muted)', textAlign: 'center' }}>
                  Try reducing quality or using PNG format
                </div>
              )}
            </ControlsSection>
          </PreviewCard>
        </ProcessingSection>
      )}
    </Container>
  );
}

export default EmojiMaker;