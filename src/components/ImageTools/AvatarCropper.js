import React, { useState, useRef, useCallback } from 'react';
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

const CropSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-top: 24px;
`;

const CropArea = styled.div`
  background-color: var(--discord-darker);
  border: 1px solid var(--discord-dark);
  border-radius: 8px;
  padding: 20px;
  position: relative;
`;

const CropCanvas = styled.canvas`
  max-width: 100%;
  border: 1px solid var(--discord-dark);
  border-radius: 8px;
  cursor: crosshair;
`;

const PreviewArea = styled.div`
  background-color: var(--discord-darker);
  border: 1px solid var(--discord-dark);
  border-radius: 8px;
  padding: 20px;
`;

const PreviewTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--discord-header-primary);
  margin-bottom: 16px;
`;

const AvatarPreview = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 16px;
  background-color: var(--discord-light);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid var(--discord-blurple);
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SizeOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const SizeButton = styled.button`
  padding: 8px 12px;
  border: 1px solid var(--discord-dark);
  border-radius: 4px;
  background-color: ${props => props.active ? 'var(--discord-blurple)' : 'var(--discord-lighter)'};
  color: ${props => props.active ? 'var(--discord-white)' : 'var(--discord-text-normal)'};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#4752C4' : '#484C52'};
  }
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 16px;
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
`;

const CropInfo = styled.div`
  font-size: 12px;
  color: var(--discord-text-muted);
  margin-top: 8px;
`;

function AvatarCropper() {
  const [originalImage, setOriginalImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropSize, setCropSize] = useState(128);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, size: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef(null);
  const previewCanvasRef = useRef(null);

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
              name: file.name
            });
            drawImageOnCanvas(img);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  });

  const drawImageOnCanvas = (img) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const maxSize = 400;
    
    // Calculate display size while maintaining aspect ratio
    let displayWidth = img.width;
    let displayHeight = img.height;
    
    if (img.width > maxSize || img.height > maxSize) {
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      displayWidth = img.width * scale;
      displayHeight = img.height * scale;
    }
    
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    
    ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
    
    // Initialize crop area to center
    const initialSize = Math.min(displayWidth, displayHeight) * 0.6;
    setCropArea({
      x: (displayWidth - initialSize) / 2,
      y: (displayHeight - initialSize) / 2,
      size: initialSize
    });
    
    drawCropOverlay();
  };

  const drawCropOverlay = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !originalImage) return;

    const ctx = canvas.getContext('2d');
    
    // Redraw the image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scale = Math.min(400 / originalImage.width, 400 / originalImage.height);
    const displayWidth = originalImage.width * scale;
    const displayHeight = originalImage.height * scale;
    
    ctx.drawImage(originalImage.element, 0, 0, displayWidth, displayHeight);
    
    // Draw overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Clear the crop area (circular)
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(
      cropArea.x + cropArea.size / 2,
      cropArea.y + cropArea.size / 2,
      cropArea.size / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    
    // Draw crop circle border
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = '#5865F2';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(
      cropArea.x + cropArea.size / 2,
      cropArea.y + cropArea.size / 2,
      cropArea.size / 2,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    
    // Update preview
    updatePreview();
  }, [cropArea, originalImage]);

  const updatePreview = () => {
    if (!originalImage) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = cropSize;
    canvas.height = cropSize;
    
    // Calculate the actual crop area on the original image
    const scale = Math.min(400 / originalImage.width, 400 / originalImage.height);
    const actualX = cropArea.x / scale;
    const actualY = cropArea.y / scale;
    const actualSize = cropArea.size / scale;
    
    // Draw the cropped area
    ctx.drawImage(
      originalImage.element,
      actualX, actualY, actualSize, actualSize,
      0, 0, cropSize, cropSize
    );
    
    setCroppedImage(canvas.toDataURL('image/png'));
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if click is inside crop area
    const centerX = cropArea.x + cropArea.size / 2;
    const centerY = cropArea.y + cropArea.size / 2;
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
    
    if (distance <= cropArea.size / 2) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newX = Math.max(0, Math.min(x - cropArea.size / 2, canvas.width - cropArea.size));
    const newY = Math.max(0, Math.min(y - cropArea.size / 2, canvas.height - cropArea.size));
    
    setCropArea(prev => ({ ...prev, x: newX, y: newY }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    drawCropOverlay();
  }, [drawCropOverlay]);

  const downloadAvatar = () => {
    if (croppedImage) {
      const link = document.createElement('a');
      link.download = `discord-avatar-${cropSize}x${cropSize}.png`;
      link.href = croppedImage;
      link.click();
    }
  };

  const sizeOptions = [32, 64, 128, 256, 512];

  return (
    <Container className="fade-in">
      <ToolCard>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <DropzoneArea isDragActive={isDragActive}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✂️</div>
            <p style={{ fontSize: '16px', color: 'var(--discord-text-normal)', marginBottom: '8px' }}>
              {isDragActive ? 'Drop your image here!' : 'Drag & drop an image, or click to select'}
            </p>
            <p style={{ fontSize: '14px', color: 'var(--discord-text-muted)' }}>
              Perfect for creating Discord profile pictures
            </p>
          </DropzoneArea>
        </div>
      </ToolCard>

      {originalImage && (
        <CropSection>
          <CropArea>
            <PreviewTitle>Crop Your Avatar</PreviewTitle>
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            <CropInfo>
              Click and drag the circle to adjust the crop area
            </CropInfo>
          </CropArea>

          <PreviewArea>
            <PreviewTitle>Preview</PreviewTitle>
            <AvatarPreview>
              {croppedImage && <PreviewImage src={croppedImage} alt="Avatar Preview" />}
            </AvatarPreview>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '14px', color: 'var(--discord-text-muted)', marginBottom: '8px', display: 'block' }}>
                Avatar Size:
              </label>
              <SizeOptions>
                {sizeOptions.map(size => (
                  <SizeButton
                    key={size}
                    active={cropSize === size}
                    onClick={() => setCropSize(size)}
                  >
                    {size}×{size}px
                  </SizeButton>
                ))}
              </SizeOptions>
            </div>

            <Controls>
              <Button 
                className="primary" 
                onClick={downloadAvatar}
                disabled={!croppedImage}
              >
                Download Avatar
              </Button>
            </Controls>
          </PreviewArea>
        </CropSection>
      )}
    </Container>
  );
}

export default AvatarCropper;