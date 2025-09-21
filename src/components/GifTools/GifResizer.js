import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: var(--discord-header-primary);
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: var(--discord-text-muted);
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const UploadSection = styled.div`
  background-color: var(--discord-darker);
  border: 2px dashed var(--discord-dark);
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: var(--discord-blurple);
    background-color: rgba(88, 101, 242, 0.1);
  }
  
  &.dragover {
    border-color: var(--discord-blurple);
    background-color: rgba(88, 101, 242, 0.2);
  }
`;

const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const UploadText = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: var(--discord-header-primary);
  margin-bottom: 8px;
`;

const UploadSubtext = styled.div`
  font-size: 14px;
  color: var(--discord-text-muted);
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewSection = styled.div`
  background-color: var(--discord-darker);
  border: 1px solid var(--discord-dark);
  border-radius: 8px;
  padding: 20px;
`;

const PreviewHeader = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--discord-header-primary);
  margin-bottom: 16px;
`;

const GifPreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const FileInfo = styled.div`
  background-color: var(--discord-dark);
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  color: var(--discord-text-muted);
`;

const InfoValue = styled.span`
  color: var(--discord-header-primary);
  font-weight: 500;
`;

const ControlsSection = styled.div`
  grid-column: 1 / -1;
  background-color: var(--discord-darker);
  border: 1px solid var(--discord-dark);
  border-radius: 8px;
  padding: 24px;
  margin-top: 20px;
`;

const ControlsHeader = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: var(--discord-header-primary);
  margin-bottom: 20px;
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const ControlLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: var(--discord-header-primary);
  margin-bottom: 8px;
`;

const Input = styled.input`
  background-color: var(--discord-dark);
  border: 1px solid var(--discord-darker);
  border-radius: 4px;
  padding: 10px 12px;
  color: var(--discord-header-primary);
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: var(--discord-blurple);
  }
`;

const Select = styled.select`
  background-color: var(--discord-dark);
  border: 1px solid var(--discord-darker);
  border-radius: 4px;
  padding: 10px 12px;
  color: var(--discord-header-primary);
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: var(--discord-blurple);
  }
`;

const PresetButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const PresetButton = styled.button`
  background-color: var(--discord-dark);
  border: 1px solid var(--discord-darker);
  border-radius: 4px;
  padding: 8px 16px;
  color: var(--discord-header-primary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--discord-blurple);
    border-color: var(--discord-blurple);
  }
`;

const ProcessButton = styled.button`
  background-color: var(--discord-blurple);
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #7289da;
  }
  
  &:disabled {
    background-color: var(--discord-dark);
    color: var(--discord-text-muted);
    cursor: not-allowed;
  }
`;

const ProgressSection = styled.div`
  background-color: var(--discord-dark);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  display: ${props => props.show ? 'block' : 'none'};
`;

const ProgressHeader = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: var(--discord-header-primary);
  margin-bottom: 12px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: var(--discord-darker);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: var(--discord-blurple);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  font-size: 14px;
  color: var(--discord-text-muted);
  text-align: center;
`;

const ProcessedPreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const DownloadButton = styled.button`
  background-color: #57f287;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  margin-top: 12px;
  
  &:hover {
    background-color: #4cdc7a;
  }
`;

const WarningText = styled.div`
  color: #faa61a;
  font-size: 14px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

function GifResizer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [quality, setQuality] = useState('80');
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [processedImage, setProcessedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setProcessedImage(null); // Clear previous processed image
      
      const img = new Image();
      img.onload = () => {
        setFileInfo({
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2),
          width: img.width,
          height: img.height
        });
        setWidth(img.width.toString());
        setHeight(img.height.toString());
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleWidthChange = (e) => {
    const newWidth = e.target.value;
    setWidth(newWidth);
    
    if (maintainAspectRatio && fileInfo && newWidth) {
      const aspectRatio = fileInfo.height / fileInfo.width;
      setHeight(Math.round(newWidth * aspectRatio).toString());
    }
  };

  const handleHeightChange = (e) => {
    const newHeight = e.target.value;
    setHeight(newHeight);
    
    if (maintainAspectRatio && fileInfo && newHeight) {
      const aspectRatio = fileInfo.width / fileInfo.height;
      setWidth(Math.round(newHeight * aspectRatio).toString());
    }
  };

  const applyPreset = (presetWidth, presetHeight) => {
    if (fileInfo) {
      const aspectRatio = fileInfo.width / fileInfo.height;
      
      if (aspectRatio > 1) {
        // Landscape
        setWidth(presetWidth.toString());
        setHeight(Math.round(presetWidth / aspectRatio).toString());
      } else {
        // Portrait or square
        setHeight(presetHeight.toString());
        setWidth(Math.round(presetHeight * aspectRatio).toString());
      }
    }
  };

  const handleProcess = async () => {
    if (!selectedFile || !width || !height) return;

    setIsProcessing(true);
    setProgress(0);
    setProgressMessage('Processing image...');

    try {
      // Create canvas for processing
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas dimensions
      canvas.width = parseInt(width);
      canvas.height = parseInt(height);

      if (selectedFile.type === 'image/gif') {
        // For GIFs, we'll process the first frame as a static image
        // In a full implementation, you'd use a GIF processing library
        setProgressMessage('Processing GIF (converting to static image)...');
        
        const img = new Image();
        img.onload = () => {
          // Apply quality settings
          if (parseInt(quality) < 100) {
            ctx.filter = `blur(${(100 - parseInt(quality)) / 50}px)`;
          }
          
          // Draw resized image
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Convert to blob
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            setProcessedImage({
              url: url,
              blob: blob,
              size: (blob.size / 1024 / 1024).toFixed(2),
              width: canvas.width,
              height: canvas.height
            });
            setProgress(100);
            setProgressMessage('Processing complete!');
            setIsProcessing(false);
          }, 'image/png', parseInt(quality) / 100);
        };
        img.src = URL.createObjectURL(selectedFile);
      } else {
        // For regular images
        setProgressMessage('Resizing image...');
        
        const img = new Image();
        img.onload = () => {
          setProgress(50);
          
          // Apply quality settings
          if (parseInt(quality) < 100) {
            ctx.filter = `blur(${(100 - parseInt(quality)) / 50}px)`;
          }
          
          // Draw resized image
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          setProgress(80);
          setProgressMessage('Finalizing...');
          
          // Convert to blob with quality
          const outputFormat = selectedFile.type === 'image/png' ? 'image/png' : 'image/jpeg';
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            setProcessedImage({
              url: url,
              blob: blob,
              size: (blob.size / 1024 / 1024).toFixed(2),
              width: canvas.width,
              height: canvas.height,
              format: outputFormat
            });
            setProgress(100);
            setProgressMessage('Processing complete!');
            setIsProcessing(false);
          }, outputFormat, parseInt(quality) / 100);
        };
        img.src = URL.createObjectURL(selectedFile);
      }
    } catch (error) {
      console.error('Processing failed:', error);
      setProgressMessage('Processing failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const estimatedSize = fileInfo && width && height ? 
    (fileInfo.size * (parseInt(width) * parseInt(height)) / (fileInfo.width * fileInfo.height) * (parseInt(quality) / 100)).toFixed(2) : 0;

  return (
    <Container className="fade-in">
      <Header>
        <Title>📐 GIF Resizer</Title>
        <Subtitle>Resize and optimize GIFs for Discord's file size limits</Subtitle>
      </Header>

      <MainContent>
        <UploadSection
          className={isDragOver ? 'dragover' : ''}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadIcon>🎬</UploadIcon>
          <UploadText>Drop any image file here or click to browse</UploadText>
          <UploadSubtext>Supports JPG, PNG, GIF, WebP and other image formats</UploadSubtext>
          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
          />
        </UploadSection>

        <PreviewSection>
          <PreviewHeader>Preview</PreviewHeader>
          {selectedFile ? (
            <>
              <GifPreview src={URL.createObjectURL(selectedFile)} alt="GIF Preview" />
              {processedImage && (
                <>
                  <PreviewHeader style={{ marginTop: '20px' }}>Processed Image</PreviewHeader>
                  <ProcessedPreview src={processedImage.url} alt="Processed Preview" />
                </>
              )}
              {fileInfo && (
                <FileInfo>
                  <InfoRow>
                    <InfoLabel>File Name:</InfoLabel>
                    <InfoValue>{fileInfo.name}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Original Size:</InfoLabel>
                    <InfoValue>{fileInfo.size} MB</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Dimensions:</InfoLabel>
                    <InfoValue>{fileInfo.width} × {fileInfo.height}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Estimated New Size:</InfoLabel>
                    <InfoValue>{estimatedSize} MB</InfoValue>
                  </InfoRow>
                  {processedImage && (
                    <>
                      <InfoRow>
                        <InfoLabel>Processed Size:</InfoLabel>
                        <InfoValue>{processedImage.size} MB</InfoValue>
                      </InfoRow>
                      <InfoRow>
                        <InfoLabel>New Dimensions:</InfoLabel>
                        <InfoValue>{processedImage.width} × {processedImage.height}</InfoValue>
                      </InfoRow>
                    </>
                  )}
                </FileInfo>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--discord-text-muted)', padding: '40px 0' }}>
              No GIF selected
            </div>
          )}
        </PreviewSection>
      </MainContent>

      {selectedFile && (
        <ControlsSection>
          <ControlsHeader>Resize Settings</ControlsHeader>
          
          <ProgressSection show={isProcessing}>
            <ProgressHeader>Processing Image</ProgressHeader>
            <ProgressBar>
              <ProgressFill progress={progress} />
            </ProgressBar>
            <ProgressText>{progressMessage} ({Math.round(progress)}%)</ProgressText>
          </ProgressSection>
          
          <PresetButtons>
            <PresetButton onClick={() => applyPreset(512, 512)}>
              Discord Emoji (512×512)
            </PresetButton>
            <PresetButton onClick={() => applyPreset(300, 300)}>
              Small (300×300)
            </PresetButton>
            <PresetButton onClick={() => applyPreset(480, 480)}>
              Medium (480×480)
            </PresetButton>
            <PresetButton onClick={() => applyPreset(800, 600)}>
              Large (800×600)
            </PresetButton>
          </PresetButtons>

          <ControlsGrid>
            <ControlGroup>
              <ControlLabel>Width (px)</ControlLabel>
              <Input
                type="number"
                value={width}
                onChange={handleWidthChange}
                placeholder="Width"
              />
            </ControlGroup>

            <ControlGroup>
              <ControlLabel>Height (px)</ControlLabel>
              <Input
                type="number"
                value={height}
                onChange={handleHeightChange}
                placeholder="Height"
              />
            </ControlGroup>

            <ControlGroup>
              <ControlLabel>Quality (%)</ControlLabel>
              <Select value={quality} onChange={(e) => setQuality(e.target.value)}>
                <option value="60">60% (Smaller file)</option>
                <option value="70">70%</option>
                <option value="80">80% (Recommended)</option>
                <option value="90">90%</option>
                <option value="100">100% (Original quality)</option>
              </Select>
            </ControlGroup>

            <ControlGroup>
              <ControlLabel>
                <input
                  type="checkbox"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                Maintain aspect ratio
              </ControlLabel>
            </ControlGroup>
          </ControlsGrid>

          {estimatedSize > 8 && (
            <WarningText>
              ⚠️ File size may exceed Discord's 8MB limit for free users
            </WarningText>
          )}

          <ProcessButton 
            onClick={handleProcess} 
            disabled={!width || !height || isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Process Image'}
          </ProcessButton>

          {processedImage && (
            <DownloadButton onClick={() => {
              const link = document.createElement('a');
              link.href = processedImage.url;
              link.download = `resized_${Date.now()}.${processedImage.format === 'image/png' ? 'png' : 'jpg'}`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}>
              📥 Download Processed Image ({processedImage.size} MB)
            </DownloadButton>
          )}
        </ControlsSection>
      )}
    </Container>
  );
}

export default GifResizer;