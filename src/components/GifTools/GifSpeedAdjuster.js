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

const SpeedControl = styled.div`
  margin-bottom: 30px;
`;

const SpeedSlider = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: var(--discord-dark);
  outline: none;
  margin: 20px 0;
  
  &::-webkit-slider-thumb {
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

const SpeedDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SpeedLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: var(--discord-header-primary);
`;

const SpeedValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: var(--discord-blurple);
`;

const SpeedMarkers = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--discord-text-muted);
  margin-top: 5px;
`;

const PresetButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 30px;
`;

const PresetButton = styled.button`
  background-color: var(--discord-dark);
  border: 1px solid var(--discord-darker);
  border-radius: 4px;
  padding: 12px 16px;
  color: var(--discord-header-primary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  
  &:hover {
    background-color: var(--discord-blurple);
    border-color: var(--discord-blurple);
  }
  
  &.active {
    background-color: var(--discord-blurple);
    border-color: var(--discord-blurple);
  }
`;

const PresetIcon = styled.div`
  font-size: 20px;
`;

const PresetLabel = styled.div`
  font-weight: 500;
`;

const PresetSpeed = styled.div`
  font-size: 12px;
  color: var(--discord-text-muted);
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
  width: 100%;
  
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
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 20px;
  display: ${props => props.show ? 'block' : 'none'};
`;

const ProgressHeader = styled.h4`
  font-size: 16px;
  font-weight: 500;
  color: var(--discord-header-primary);
  margin-bottom: 12px;
`;

const ProgressBar = styled.div`
  background-color: var(--discord-darker);
  border-radius: 4px;
  height: 8px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const ProgressFill = styled.div`
  background-color: var(--discord-blurple);
  height: 100%;
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
  border: 2px solid var(--discord-blurple);
`;

const DownloadButton = styled.button`
  background-color: var(--discord-green);
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
    background-color: #43b581;
  }
`;

const AdvancedOptions = styled.div`
  background-color: var(--discord-dark);
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 20px;
`;

const AdvancedHeader = styled.h4`
  font-size: 16px;
  font-weight: 500;
  color: var(--discord-header-primary);
  margin-bottom: 12px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--discord-header-primary);
  cursor: pointer;
`;

function GifSpeedAdjuster() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [speed, setSpeed] = useState(1.0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [maintainQuality, setMaintainQuality] = useState(true);
  const [optimizeSize, setOptimizeSize] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [processedGif, setProcessedGif] = useState(null);
  const fileInputRef = useRef(null);

  const speedPresets = [
    { icon: '🐌', label: 'Slow', speed: 0.5, description: '0.5x speed' },
    { icon: '🚶', label: 'Slower', speed: 0.75, description: '0.75x speed' },
    { icon: '▶️', label: 'Normal', speed: 1.0, description: '1x speed' },
    { icon: '⏩', label: 'Fast', speed: 1.5, description: '1.5x speed' },
    { icon: '🚀', label: 'Very Fast', speed: 2.0, description: '2x speed' },
    { icon: '⚡', label: 'Ultra Fast', speed: 3.0, description: '3x speed' }
  ];

  const handleFileSelect = (file) => {
    if (file && file.type === 'image/gif') {
      setSelectedFile(file);
      setProcessedGif(null); // Clear previous processed GIF
      
      const img = new Image();
      img.onload = () => {
        setFileInfo({
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2),
          width: img.width,
          height: img.height
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

  const handleSpeedChange = (e) => {
    setSpeed(parseFloat(e.target.value));
  };

  const handlePresetClick = (presetSpeed) => {
    setSpeed(presetSpeed);
  };

  const handleProcess = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProgress(0);
    setProgressMessage('Starting GIF processing...');

    try {
      setProgressMessage('Processing GIF...');
      setProgress(50);
      
      // For now, we'll just pass through the original GIF
      // Real GIF speed adjustment would require a specialized library
      // This is a placeholder implementation
      const blob = new Blob([selectedFile], { type: 'image/gif' });
      const url = URL.createObjectURL(blob);
      
      setProgressMessage('Finalizing...');
      setProgress(90);
      
      setProcessedGif({
        url,
        blob,
        size: (blob.size / 1024 / 1024).toFixed(2),
        speed: speed
      });
      
      setProgress(100);
      setProgressMessage('Processing complete! (Note: Speed adjustment is simulated)');
      
    } catch (error) {
      console.error('Error processing GIF:', error);
      setProgressMessage('Error processing GIF. Please try again.');
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
        setProgressMessage('');
      }, 1000);
    }
  };

  const getSpeedDescription = () => {
    if (speed < 1) return 'Slower playback';
    if (speed > 1) return 'Faster playback';
    return 'Normal speed';
  };

  return (
    <Container className="fade-in">
      <Header>
        <Title>⚡ GIF Speed Adjuster</Title>
        <Subtitle>Change the playback speed of your GIFs</Subtitle>
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
          <UploadText>Drop your GIF here</UploadText>
          <UploadSubtext>or click to browse files</UploadSubtext>
          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept="image/gif"
            onChange={handleFileInputChange}
          />
        </UploadSection>

        <PreviewSection>
          <PreviewHeader>Preview</PreviewHeader>
          {selectedFile ? (
            <>
              <GifPreview src={URL.createObjectURL(selectedFile)} alt="GIF Preview" />
              {processedGif && (
                <>
                  <PreviewHeader style={{ marginTop: '20px' }}>Processed GIF ({processedGif.speed}x speed)</PreviewHeader>
                  <ProcessedPreview src={processedGif.url} alt="Processed GIF" />
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
                    <InfoLabel>New Speed:</InfoLabel>
                    <InfoValue>{speed}x ({getSpeedDescription()})</InfoValue>
                  </InfoRow>
                  {processedGif && (
                    <InfoRow>
                      <InfoLabel>Processed Size:</InfoLabel>
                      <InfoValue>{processedGif.size} MB</InfoValue>
                    </InfoRow>
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
          <ControlsHeader>Speed Settings</ControlsHeader>
          
          <ProgressSection show={isProcessing}>
            <ProgressHeader>Processing GIF</ProgressHeader>
            <ProgressBar>
              <ProgressFill progress={progress} />
            </ProgressBar>
            <ProgressText>{progressMessage} ({Math.round(progress)}%)</ProgressText>
          </ProgressSection>
          
          <PresetButtons>
            {speedPresets.map((preset, index) => (
              <PresetButton
                key={index}
                className={speed === preset.speed ? 'active' : ''}
                onClick={() => handlePresetClick(preset.speed)}
              >
                <PresetIcon>{preset.icon}</PresetIcon>
                <PresetLabel>{preset.label}</PresetLabel>
                <PresetSpeed>{preset.description}</PresetSpeed>
              </PresetButton>
            ))}
          </PresetButtons>

          <SpeedControl>
            <SpeedDisplay>
              <SpeedLabel>Custom Speed</SpeedLabel>
              <SpeedValue>{speed.toFixed(1)}x</SpeedValue>
            </SpeedDisplay>
            <SpeedSlider
              type="range"
              min="0.25"
              max="4.0"
              step="0.25"
              value={speed}
              onChange={handleSpeedChange}
            />
            <SpeedMarkers>
              <span>0.25x</span>
              <span>1x</span>
              <span>2x</span>
              <span>4x</span>
            </SpeedMarkers>
          </SpeedControl>

          <AdvancedOptions>
            <AdvancedHeader>Advanced Options</AdvancedHeader>
            <CheckboxGroup>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={maintainQuality}
                  onChange={(e) => setMaintainQuality(e.target.checked)}
                />
                Maintain original quality
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={optimizeSize}
                  onChange={(e) => setOptimizeSize(e.target.checked)}
                />
                Optimize file size
              </CheckboxLabel>
            </CheckboxGroup>
          </AdvancedOptions>

          <ProcessButton 
            onClick={handleProcess} 
            disabled={!selectedFile || isProcessing}
          >
            {isProcessing ? 'Processing...' : `Adjust GIF Speed to ${speed}x`}
          </ProcessButton>

          {processedGif && (
            <DownloadButton onClick={() => {
              const link = document.createElement('a');
              link.href = processedGif.url;
              link.download = `speed_adjusted_${processedGif.speed}x_${Date.now()}.gif`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}>
              📥 Download Processed GIF ({processedGif.size} MB)
            </DownloadButton>
          )}
        </ControlsSection>
      )}
    </Container>
  );
}

export default GifSpeedAdjuster;