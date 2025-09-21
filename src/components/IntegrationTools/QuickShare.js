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

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const QuickActionCard = styled.div`
  background-color: var(--discord-dark);
  border: 1px solid var(--discord-input-border);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--discord-blurple);
    background-color: rgba(88, 101, 242, 0.1);
  }

  &.processing {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ActionIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
`;

const ActionTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: var(--discord-header-primary);
  margin-bottom: 8px;
`;

const ActionDescription = styled.p`
  font-size: 14px;
  color: var(--discord-text-muted);
  margin-bottom: 12px;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 8px 16px;
  background-color: var(--discord-blurple);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: var(--discord-blurple-dark);
  }

  &:disabled {
    background-color: var(--discord-dark);
    color: var(--discord-text-muted);
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.div`
  background-color: ${props => {
    switch (props.type) {
      case 'success': return 'rgba(67, 181, 129, 0.1)';
      case 'error': return 'rgba(240, 71, 71, 0.1)';
      case 'info': return 'rgba(88, 101, 242, 0.1)';
      default: return 'var(--discord-dark)';
    }
  }};
  border: 1px solid ${props => {
    switch (props.type) {
      case 'success': return '#43b581';
      case 'error': return '#f04747';
      case 'info': return '#5865f2';
      default: return 'var(--discord-input-border)';
    }
  }};
  border-radius: 4px;
  padding: 12px 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusIcon = styled.span`
  font-size: 16px;
`;

const StatusText = styled.span`
  font-size: 14px;
  color: var(--discord-text-normal);
`;

const CustomControls = styled.div`
  background-color: var(--discord-dark);
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
`;

const ControlRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: var(--discord-text-normal);
`;

const Slider = styled.input`
  width: 120px;
  height: 6px;
  border-radius: 3px;
  background: var(--discord-darker);
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--discord-blurple);
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
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
  min-width: 40px;
  text-align: right;
`;

function QuickShare() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [customQuality, setCustomQuality] = useState(85);
  const [customMaxSize, setCustomMaxSize] = useState(8);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setStatusMessage(null);
      
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

  const processImage = async (targetSizeMB, quality = 85) => {
    if (!selectedFile) return null;

    try {
      const options = {
        maxSizeMB: targetSizeMB,
        useWebWorker: true,
        initialQuality: quality / 100
      };

      const compressedFile = await imageCompression(selectedFile, options);
      
      // Get image dimensions
      const img = new Image();
      const url = URL.createObjectURL(compressedFile);
      
      return new Promise((resolve) => {
        img.onload = () => {
          resolve({
            buffer: null, // Not needed for browser-image-compression
            blob: compressedFile,
            size: (compressedFile.size / 1024 / 1024).toFixed(2),
            width: img.width,
            height: img.height,
            scale: 1 // Scale calculation not available with browser-image-compression
          });
          URL.revokeObjectURL(url);
        };
        img.src = url;
      });
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  };

  const copyToClipboard = async (blob) => {
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const item = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([item]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      return false;
    }
  };

  const handleQuickAction = async (action) => {
    if (!selectedFile || isProcessing) return;

    setIsProcessing(true);
    setStatusMessage({ type: 'info', text: 'Processing image...' });

    try {
      let result;
      
      switch (action) {
        case 'discord-8mb':
          result = await processImage(8, 85);
          break;
        case 'discord-100mb':
          result = await processImage(100, 90);
          break;
        case 'web-optimized':
          result = await processImage(2, 75);
          break;
        case 'custom':
          result = await processImage(customMaxSize, customQuality);
          break;
        default:
          throw new Error('Unknown action');
      }

      // Try to copy to clipboard
      const copied = await copyToClipboard(result.blob);
      
      if (copied) {
        setStatusMessage({
          type: 'success',
          text: `Image optimized and copied to clipboard! (${result.size}MB, ${result.width}×${result.height})`
        });
      } else {
        // Fallback: create download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(result.blob);
        link.download = `optimized_${selectedFile.name}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setStatusMessage({
          type: 'success',
          text: `Image optimized and downloaded! (${result.size}MB, ${result.width}×${result.height})`
        });
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        text: 'Failed to process image. Please try again.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  return (
    <Container className="fade-in">
      <Header>
        <Title>📤 Quick Share</Title>
        <Subtitle>Instantly optimize and share images to clipboard</Subtitle>
      </Header>

      <UploadSection
        className={isDragOver ? 'dragover' : ''}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadIcon>📤</UploadIcon>
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
          {statusMessage && (
            <StatusMessage type={statusMessage.type}>
              <StatusIcon>{getStatusIcon(statusMessage.type)}</StatusIcon>
              <StatusText>{statusMessage.text}</StatusText>
            </StatusMessage>
          )}

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
              <SectionTitle>⚡ Quick Actions</SectionTitle>
              
              <QuickActionsGrid>
                <QuickActionCard 
                  className={isProcessing ? 'processing' : ''}
                  onClick={() => handleQuickAction('discord-8mb')}
                >
                  <ActionIcon>💬</ActionIcon>
                  <ActionTitle>Discord Regular</ActionTitle>
                  <ActionDescription>Optimize for 8MB limit</ActionDescription>
                  <ActionButton disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Copy to Clipboard'}
                  </ActionButton>
                </QuickActionCard>

                <QuickActionCard 
                  className={isProcessing ? 'processing' : ''}
                  onClick={() => handleQuickAction('discord-100mb')}
                >
                  <ActionIcon>💎</ActionIcon>
                  <ActionTitle>Discord Nitro</ActionTitle>
                  <ActionDescription>Optimize for 100MB limit</ActionDescription>
                  <ActionButton disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Copy to Clipboard'}
                  </ActionButton>
                </QuickActionCard>

                <QuickActionCard 
                  className={isProcessing ? 'processing' : ''}
                  onClick={() => handleQuickAction('web-optimized')}
                >
                  <ActionIcon>🌐</ActionIcon>
                  <ActionTitle>Web Optimized</ActionTitle>
                  <ActionDescription>Small size for web use</ActionDescription>
                  <ActionButton disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Copy to Clipboard'}
                  </ActionButton>
                </QuickActionCard>
              </QuickActionsGrid>

              <CustomControls>
                <ControlRow>
                  <Label>Custom Quality:</Label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Slider
                      type="range"
                      min="10"
                      max="100"
                      value={customQuality}
                      onChange={(e) => setCustomQuality(parseInt(e.target.value))}
                    />
                    <SliderValue>{customQuality}%</SliderValue>
                  </div>
                </ControlRow>
                
                <ControlRow>
                  <Label>Max Size:</Label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Slider
                      type="range"
                      min="1"
                      max="100"
                      value={customMaxSize}
                      onChange={(e) => setCustomMaxSize(parseInt(e.target.value))}
                    />
                    <SliderValue>{customMaxSize}MB</SliderValue>
                  </div>
                </ControlRow>
                
                <ActionButton 
                  onClick={() => handleQuickAction('custom')}
                  disabled={isProcessing}
                  style={{ marginTop: '12px' }}
                >
                  {isProcessing ? 'Processing...' : 'Apply Custom Settings'}
                </ActionButton>
              </CustomControls>
            </Section>
          </Grid>
        </>
      )}
    </Container>
  );
}

export default QuickShare;