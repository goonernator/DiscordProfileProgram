import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import imageCompression from 'browser-image-compression';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--discord-header-primary);
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: var(--discord-text-muted);
`;

const UploadSection = styled.div`
  background-color: var(--discord-darker);
  border: 2px dashed var(--discord-input-border);
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 30px;

  &:hover, &.dragover {
    border-color: var(--discord-blurple);
    background-color: rgba(88, 101, 242, 0.1);
  }
`;

const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const UploadText = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--discord-header-primary);
  margin-bottom: 8px;
`;

const UploadSubtext = styled.p`
  font-size: 14px;
  color: var(--discord-text-muted);
  margin-bottom: 16px;
`;

const SupportedFormats = styled.div`
  font-size: 12px;
  color: var(--discord-text-muted);
`;

const HiddenInput = styled.input`
  display: none;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background-color: var(--discord-darker);
  border: 1px solid var(--discord-dark);
  border-radius: 8px;
  padding: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--discord-header-primary);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const FileInfo = styled.div`
  background-color: var(--discord-dark);
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  font-size: 14px;
  color: var(--discord-text-muted);
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: var(--discord-text-normal);
  font-weight: 500;
`;

const ControlsSection = styled.div`
  margin-bottom: 20px;
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

const Slider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--discord-dark);
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--discord-blurple);
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--discord-blurple);
    cursor: pointer;
    border: none;
  }
`;

const SliderValue = styled.span`
  font-size: 14px;
  color: var(--discord-text-normal);
  font-weight: 500;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 20px;
  background-color: var(--discord-blurple);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 12px;

  &:hover:not(:disabled) {
    background-color: var(--discord-blurple-dark);
  }

  &:disabled {
    background-color: var(--discord-dark);
    color: var(--discord-text-muted);
    cursor: not-allowed;
  }

  &.secondary {
    background-color: var(--discord-dark);
    border: 1px solid var(--discord-input-border);
    color: var(--discord-text-normal);
  }

  &.secondary:hover:not(:disabled) {
    background-color: var(--discord-darker);
  }
`;

const ProgressSection = styled.div`
  background-color: var(--discord-darker);
  border: 1px solid var(--discord-dark);
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
  background-color: var(--discord-dark);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: var(--discord-green);
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`;

const ProgressText = styled.p`
  font-size: 14px;
  color: var(--discord-text-muted);
  margin: 0;
`;

function ImageOptimizer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [quality, setQuality] = useState(85);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [maxHeight, setMaxHeight] = useState(1080);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [optimizedImage, setOptimizedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setOptimizedImage(null);
      
      const fileSize = file.size / 1024 / 1024; // MB
      
      // Create image to get dimensions
      const img = new Image();
      img.onload = () => {
        setFileInfo({
          name: file.name,
          size: fileSize.toFixed(2),
          type: file.type,
          width: img.width,
          height: img.height,
          url: URL.createObjectURL(file)
        });
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

  const handleOptimize = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProgress(0);
    setProgressMessage('Starting optimization...');

    try {
      setProgressMessage('Processing image...');
      setProgress(40);
      
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: Math.max(maxWidth, maxHeight),
        useWebWorker: true,
        initialQuality: quality / 100
      };
      
      setProgressMessage('Applying compression...');
      setProgress(80);
      
      const compressedFile = await imageCompression(selectedFile, options);
      
      setProgressMessage('Finalizing...');
      setProgress(90);
      
      // Create optimized image info
      const url = URL.createObjectURL(compressedFile);
      const optimizedSize = compressedFile.size / 1024 / 1024; // MB
      
      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        setOptimizedImage({
          url,
          blob: compressedFile,
          size: optimizedSize.toFixed(2),
          width: img.width,
          height: img.height,
          compressionRatio: ((selectedFile.size - compressedFile.size) / selectedFile.size * 100).toFixed(1)
        });
      };
      img.src = url;
      
      setProgress(100);
      setProgressMessage('Optimization complete!');
      
    } catch (error) {
      console.error('Error optimizing image:', error);
      setProgressMessage('Error optimizing image. Please try again.');
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
        setProgressMessage('');
      }, 1000);
    }
  };

  const handleDownload = () => {
    if (!optimizedImage) return;
    
    const link = document.createElement('a');
    link.href = optimizedImage.url;
    link.download = `optimized_${selectedFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container className="fade-in">
      <Header>
        <Title>⚡ Image Optimizer</Title>
        <Subtitle>Compress and optimize images for Discord and web use</Subtitle>
      </Header>

      <UploadSection
        className={isDragOver ? 'dragover' : ''}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadIcon>⚡</UploadIcon>
        <UploadText>Drop your image here</UploadText>
        <UploadSubtext>or click to browse files</UploadSubtext>
        <SupportedFormats>
          Supports: JPG, PNG, WebP, BMP, TIFF
        </SupportedFormats>
        <HiddenInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
        />
      </UploadSection>

      {selectedFile && (
        <>
          <ProgressSection show={isProcessing}>
            <ProgressHeader>Optimizing Image</ProgressHeader>
            <ProgressBar>
              <ProgressFill progress={progress} />
            </ProgressBar>
            <ProgressText>{progressMessage}</ProgressText>
          </ProgressSection>

          <Grid>
            <Section>
              <SectionTitle>📷 Original Image</SectionTitle>
              <ImagePreview src={fileInfo?.url} alt="Original" />
              <FileInfo>
                <InfoRow>
                  <InfoLabel>File Name:</InfoLabel>
                  <InfoValue>{fileInfo?.name}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>File Size:</InfoLabel>
                  <InfoValue>{fileInfo?.size} MB</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Dimensions:</InfoLabel>
                  <InfoValue>{fileInfo?.width} × {fileInfo?.height}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Format:</InfoLabel>
                  <InfoValue>{fileInfo?.type}</InfoValue>
                </InfoRow>
              </FileInfo>
            </Section>

            <Section>
              <SectionTitle>⚙️ Optimization Settings</SectionTitle>
              
              <ControlsSection>
                <ControlGroup>
                  <Label>
                    Quality: <SliderValue>{quality}%</SliderValue>
                  </Label>
                  <Slider
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                  />
                </ControlGroup>

                <ControlGroup>
                  <Label>
                    Max Width: <SliderValue>{maxWidth}px</SliderValue>
                  </Label>
                  <Slider
                    type="range"
                    min="100"
                    max="3840"
                    step="100"
                    value={maxWidth}
                    onChange={(e) => setMaxWidth(parseInt(e.target.value))}
                  />
                </ControlGroup>

                <ControlGroup>
                  <Label>
                    Max Height: <SliderValue>{maxHeight}px</SliderValue>
                  </Label>
                  <Slider
                    type="range"
                    min="100"
                    max="2160"
                    step="100"
                    value={maxHeight}
                    onChange={(e) => setMaxHeight(parseInt(e.target.value))}
                  />
                </ControlGroup>
              </ControlsSection>

              <Button 
                onClick={handleOptimize}
                disabled={!selectedFile || isProcessing}
              >
                {isProcessing ? 'Optimizing...' : 'Optimize Image'}
              </Button>

              {optimizedImage && (
                <Button 
                  className="secondary"
                  onClick={handleDownload}
                >
                  Download Optimized Image
                </Button>
              )}
            </Section>
          </Grid>

          {optimizedImage && (
            <Section>
              <SectionTitle>✨ Optimized Result</SectionTitle>
              <Grid>
                <div>
                  <ImagePreview src={optimizedImage.url} alt="Optimized" />
                </div>
                <FileInfo>
                  <InfoRow>
                    <InfoLabel>New Size:</InfoLabel>
                    <InfoValue style={{ color: '#43b581' }}>{optimizedImage.size} MB</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>New Dimensions:</InfoLabel>
                    <InfoValue>{optimizedImage.width} × {optimizedImage.height}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Size Reduction:</InfoLabel>
                    <InfoValue style={{ color: '#43b581' }}>{optimizedImage.compressionRatio}%</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Space Saved:</InfoLabel>
                    <InfoValue style={{ color: '#43b581' }}>
                      {(parseFloat(fileInfo.size) - parseFloat(optimizedImage.size)).toFixed(2)} MB
                    </InfoValue>
                  </InfoRow>
                </FileInfo>
              </Grid>
            </Section>
          )}
        </>
      )}
    </Container>
  );
}

export default ImageOptimizer;