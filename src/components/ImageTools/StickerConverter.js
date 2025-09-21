import React, { useState } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const Container = styled.div`
  max-width: 900px;
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
  grid-template-columns: 1fr 1fr 1fr;
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

const StickerPreview = styled.div`
  width: 160px;
  height: 160px;
  background: 
    linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
    linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
    linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
    linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
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

const InfoBox = styled.div`
  background-color: var(--discord-light);
  border-left: 4px solid var(--discord-blurple);
  padding: 12px;
  border-radius: 4px;
  font-size: 14px;
  color: var(--discord-text-normal);
  margin-bottom: 16px;
`;

function StickerConverter() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedStickers, setProcessedStickers] = useState({});
  const [stickerSize, setStickerSize] = useState('320');
  const [isProcessing, setIsProcessing] = useState(false);

  const stickerSizes = {
    '160': { width: 160, height: 160, name: 'Small (160×160)' },
    '320': { width: 320, height: 320, name: 'Medium (320×320)' },
    '512': { width: 512, height: 512, name: 'Large (512×512)' }
  };

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
            processAllSizes(img);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  });

  const processAllSizes = (img) => {
    setIsProcessing(true);
    const processed = {};
    
    Object.entries(stickerSizes).forEach(([key, size]) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = size.width;
      canvas.height = size.height;
      
      // Clear canvas (transparent background)
      ctx.clearRect(0, 0, size.width, size.height);
      
      // Calculate dimensions to fit within the sticker size while maintaining aspect ratio
      const scale = Math.min(size.width / img.width, size.height / img.height);
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      
      // Center the image
      const x = (size.width - scaledWidth) / 2;
      const y = (size.height - scaledHeight) / 2;
      
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
      
      const dataUrl = canvas.toDataURL('image/png');
      const base64Length = dataUrl.split(',')[1].length;
      const sizeInBytes = (base64Length * 3) / 4;
      
      processed[key] = {
        dataUrl,
        size: sizeInBytes,
        dimensions: size
      };
    });
    
    setProcessedStickers(processed);
    setIsProcessing(false);
  };

  const downloadSticker = (size) => {
    const sticker = processedStickers[size];
    if (sticker) {
      const link = document.createElement('a');
      const dimensions = stickerSizes[size];
      link.download = `discord-sticker-${dimensions.width}x${dimensions.height}.png`;
      link.href = sticker.dataUrl;
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

  const getStickerStatus = (size) => {
    const sticker = processedStickers[size];
    if (!sticker) return null;
    
    const maxSize = 512 * 1024; // 512KB limit for stickers
    
    if (sticker.size <= maxSize) {
      return {
        type: 'success',
        message: `✅ ${formatFileSize(sticker.size)} (Discord compatible)`
      };
    } else {
      return {
        type: 'warning',
        message: `⚠️ ${formatFileSize(sticker.size)} (over 512KB limit)`
      };
    }
  };

  return (
    <Container className="fade-in">
      <ToolCard>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <DropzoneArea isDragActive={isDragActive}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏷️</div>
            <p style={{ fontSize: '16px', color: 'var(--discord-text-normal)', marginBottom: '8px' }}>
              {isDragActive ? 'Drop your image here!' : 'Drag & drop an image, or click to select'}
            </p>
            <p style={{ fontSize: '14px', color: 'var(--discord-text-muted)' }}>
              Convert images to Discord sticker format
            </p>
          </DropzoneArea>
        </div>

        <InfoBox>
          <strong>Discord Sticker Requirements:</strong><br />
          • PNG format with transparency support<br />
          • Square dimensions (160×160, 320×320, or 512×512)<br />
          • File size under 512KB<br />
          • Transparent background recommended
        </InfoBox>
      </ToolCard>

      {originalImage && (
        <ProcessingSection>
          {Object.entries(stickerSizes).map(([key, size]) => {
            const sticker = processedStickers[key];
            const status = getStickerStatus(key);
            
            return (
              <PreviewCard key={key}>
                <PreviewTitle>{size.name}</PreviewTitle>
                <StickerPreview>
                  {isProcessing ? (
                    <div className="pulse">Processing...</div>
                  ) : sticker ? (
                    <PreviewImage src={sticker.dataUrl} alt={`Sticker ${size.name}`} />
                  ) : null}
                </StickerPreview>
                
                {sticker && (
                  <>
                    <ImageInfo>
                      {size.width} × {size.height} pixels<br />
                      PNG format
                    </ImageInfo>

                    {status && (
                      <StatusIndicator className={status.type}>
                        {status.message}
                      </StatusIndicator>
                    )}

                    <ControlsSection>
                      <Button 
                        className={status?.type === 'success' ? 'success' : 'primary'}
                        onClick={() => downloadSticker(key)}
                      >
                        {status?.type === 'success' ? '✅ Download' : '⚠️ Download'}
                      </Button>
                    </ControlsSection>
                  </>
                )}
              </PreviewCard>
            );
          })}
        </ProcessingSection>
      )}

      {originalImage && !isProcessing && (
        <ToolCard>
          <PreviewTitle>Original Image</PreviewTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <StickerPreview style={{ width: '120px', height: '120px' }}>
              <PreviewImage src={originalImage.src} alt="Original" />
            </StickerPreview>
            <ImageInfo style={{ textAlign: 'left' }}>
              <strong>Original Dimensions:</strong> {originalImage.width} × {originalImage.height}<br />
              <strong>File Size:</strong> {formatFileSize(originalImage.size)}<br />
              <strong>File Name:</strong> {originalImage.name}
            </ImageInfo>
          </div>
        </ToolCard>
      )}
    </Container>
  );
}

export default StickerConverter;