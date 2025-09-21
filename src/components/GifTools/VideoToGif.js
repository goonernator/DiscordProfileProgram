import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

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

const SupportedFormats = styled.div`
  font-size: 12px;
  color: var(--discord-text-muted);
  margin-top: 12px;
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

const VideoPreview = styled.video`
  max-width: 100%;
  max-height: 300px;
  border-radius: 4px;
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

const TimelineSection = styled.div`
  margin-bottom: 24px;
`;

const TimelineHeader = styled.h4`
  font-size: 16px;
  font-weight: 500;
  color: var(--discord-header-primary);
  margin-bottom: 12px;
`;

const TimelineControls = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const TimeInput = styled.input`
  background-color: var(--discord-dark);
  border: 1px solid var(--discord-darker);
  border-radius: 4px;
  padding: 8px 12px;
  color: var(--discord-header-primary);
  font-size: 14px;
  width: 80px;
  
  &:focus {
    outline: none;
    border-color: var(--discord-blurple);
  }
`;

const TimelineSlider = styled.input`
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: var(--discord-dark);
  outline: none;
  
  &::-webkit-slider-thumb {
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

const WarningText = styled.div`
  color: #faa61a;
  font-size: 14px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
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

function VideoToGif() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(5);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [fps, setFps] = useState('15');
  const [quality, setQuality] = useState('medium');
  const [isDragOver, setIsDragOver] = useState(false);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [optimizeColors, setOptimizeColors] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [outputGif, setOutputGif] = useState(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const ffmpegRef = useRef(new FFmpeg());

  useEffect(() => {
    loadFFmpeg();
  }, []);

  const loadFFmpeg = async () => {
    try {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      const ffmpeg = ffmpegRef.current;
      
      ffmpeg.on('log', ({ message }) => {
        console.log(message);
        if (message.includes('frame=')) {
          // Extract progress from FFmpeg logs
          const frameMatch = message.match(/frame=\s*(\d+)/);
          if (frameMatch) {
            const currentFrame = parseInt(frameMatch[1]);
            const totalFrames = Math.ceil((endTime - startTime) * parseInt(fps));
            const progressPercent = Math.min((currentFrame / totalFrames) * 100, 100);
            setProgress(progressPercent);
          }
        }
      });

      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      
      setFfmpegLoaded(true);
      console.log('FFmpeg loaded successfully');
    } catch (error) {
      console.error('Failed to load FFmpeg:', error);
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      setOutputGif(null); // Clear previous output
      
      const video = document.createElement('video');
      video.onloadedmetadata = () => {
        setFileInfo({
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2),
          width: video.videoWidth,
          height: video.videoHeight,
          duration: video.duration
        });
        setWidth(video.videoWidth.toString());
        setHeight(video.videoHeight.toString());
        setEndTime(Math.min(5, video.duration));
      };
      video.src = URL.createObjectURL(file);
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
    if (!ffmpegLoaded || !selectedFile) {
      alert('FFmpeg is not loaded yet or no file selected. Please wait and try again.');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setProgressMessage('Preparing video...');
    setOutputGif(null);

    try {
      const ffmpeg = ffmpegRef.current;
      
      // Write input file
      setProgressMessage('Loading video file...');
      await ffmpeg.writeFile('input.mp4', await fetchFile(selectedFile));
      
      // Build FFmpeg command
      const duration = endTime - startTime;
      const scaleFilter = `scale=${width}:${height}`;
      const paletteFilter = optimizeColors ? 
        `[0:v] ${scaleFilter},fps=${fps},split [a][b];[a] palettegen [p];[b][p] paletteuse` :
        `${scaleFilter},fps=${fps}`;
      
      setProgressMessage('Converting to GIF...');
      
      // Execute FFmpeg command
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-ss', startTime.toString(),
        '-t', duration.toString(),
        '-vf', paletteFilter,
        '-y', // Overwrite output file
        'output.gif'
      ]);

      setProgressMessage('Finalizing...');
      
      // Read output file
      const data = await ffmpeg.readFile('output.gif');
      const gifBlob = new Blob([data.buffer], { type: 'image/gif' });
      const gifUrl = URL.createObjectURL(gifBlob);
      
      setOutputGif({
        url: gifUrl,
        blob: gifBlob,
        size: (gifBlob.size / 1024 / 1024).toFixed(2)
      });
      
      setProgress(100);
      setProgressMessage('Conversion complete!');
      
    } catch (error) {
      console.error('Conversion failed:', error);
      setProgressMessage('Conversion failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadGif = () => {
    if (outputGif) {
      const link = document.createElement('a');
      link.href = outputGif.url;
      link.download = `converted_${Date.now()}.gif`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const estimatedSize = fileInfo && width && height ? 
    ((parseInt(width) * parseInt(height) * parseInt(fps) * (endTime - startTime)) / 1000000).toFixed(2) : 0;

  return (
    <Container className="fade-in">
      <Header>
        <Title>🎬 Video to GIF</Title>
        <Subtitle>Convert video clips to animated GIFs for Discord</Subtitle>
        {!ffmpegLoaded && (
          <div style={{ color: '#faa61a', fontSize: '14px', marginTop: '8px' }}>
            Loading video processing engine...
          </div>
        )}
      </Header>

      <MainContent>
        <UploadSection
          className={isDragOver ? 'dragover' : ''}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadIcon>📹</UploadIcon>
          <UploadText>Drop your video here</UploadText>
          <UploadSubtext>or click to browse files</UploadSubtext>
          <SupportedFormats>
            Supports: MP4, MOV, AVI, MKV, WebM
          </SupportedFormats>
          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileInputChange}
          />
        </UploadSection>

        <PreviewSection>
          <PreviewHeader>Preview</PreviewHeader>
          {selectedFile ? (
            <>
              <VideoPreview 
                ref={videoRef}
                src={URL.createObjectURL(selectedFile)} 
                controls 
              />
              {outputGif && (
                <>
                  <PreviewHeader style={{ marginTop: '20px' }}>Generated GIF</PreviewHeader>
                  <GifPreview src={outputGif.url} alt="Generated GIF" />
                </>
              )}
              {fileInfo && (
                <FileInfo>
                  <InfoRow>
                    <InfoLabel>File Name:</InfoLabel>
                    <InfoValue>{fileInfo.name}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>File Size:</InfoLabel>
                    <InfoValue>{fileInfo.size} MB</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Dimensions:</InfoLabel>
                    <InfoValue>{fileInfo.width} × {fileInfo.height}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Duration:</InfoLabel>
                    <InfoValue>{formatTime(fileInfo.duration)}</InfoValue>
                  </InfoRow>
                  {outputGif && (
                    <InfoRow>
                      <InfoLabel>GIF Size:</InfoLabel>
                      <InfoValue>{outputGif.size} MB</InfoValue>
                    </InfoRow>
                  )}
                </FileInfo>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--discord-text-muted)', padding: '40px 0' }}>
              No video selected
            </div>
          )}
        </PreviewSection>
      </MainContent>

      {selectedFile && fileInfo && (
        <ControlsSection>
          <ControlsHeader>Conversion Settings</ControlsHeader>
          
          <ProgressSection show={isProcessing}>
            <ProgressHeader>Converting Video to GIF</ProgressHeader>
            <ProgressBar>
              <ProgressFill progress={progress} />
            </ProgressBar>
            <ProgressText>{progressMessage} ({Math.round(progress)}%)</ProgressText>
          </ProgressSection>
          
          <TimelineSection>
            <TimelineHeader>Select Time Range</TimelineHeader>
            <TimelineControls>
              <div>
                <ControlLabel>Start:</ControlLabel>
                <TimeInput
                  type="number"
                  min="0"
                  max={fileInfo.duration}
                  step="0.1"
                  value={startTime}
                  onChange={(e) => setStartTime(Math.max(0, Math.min(parseFloat(e.target.value), endTime - 0.1)))}
                />
              </div>
              <TimelineSlider
                type="range"
                min="0"
                max={fileInfo.duration}
                step="0.1"
                value={startTime}
                onChange={(e) => setStartTime(Math.max(0, Math.min(parseFloat(e.target.value), endTime - 0.1)))}
              />
              <div>
                <ControlLabel>End:</ControlLabel>
                <TimeInput
                  type="number"
                  min="0"
                  max={fileInfo.duration}
                  step="0.1"
                  value={endTime}
                  onChange={(e) => setEndTime(Math.max(startTime + 0.1, Math.min(parseFloat(e.target.value), fileInfo.duration)))}
                />
              </div>
            </TimelineControls>
            <div style={{ fontSize: '14px', color: 'var(--discord-text-muted)' }}>
              Duration: {formatTime(endTime - startTime)} ({startTime.toFixed(1)}s - {endTime.toFixed(1)}s)
            </div>
          </TimelineSection>

          <PresetButtons>
            <PresetButton onClick={() => applyPreset(480, 480)}>
              Small (480px)
            </PresetButton>
            <PresetButton onClick={() => applyPreset(720, 720)}>
              Medium (720px)
            </PresetButton>
            <PresetButton onClick={() => applyPreset(1080, 1080)}>
              Large (1080px)
            </PresetButton>
            <PresetButton onClick={() => { setStartTime(0); setEndTime(Math.min(3, fileInfo.duration)); }}>
              Quick 3s Clip
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
              <ControlLabel>Frame Rate (FPS)</ControlLabel>
              <Select value={fps} onChange={(e) => setFps(e.target.value)}>
                <option value="10">10 FPS (Smaller file)</option>
                <option value="15">15 FPS (Recommended)</option>
                <option value="20">20 FPS</option>
                <option value="24">24 FPS (Smooth)</option>
                <option value="30">30 FPS (High quality)</option>
              </Select>
            </ControlGroup>

            <ControlGroup>
              <ControlLabel>Quality</ControlLabel>
              <Select value={quality} onChange={(e) => setQuality(e.target.value)}>
                <option value="low">Low (Smaller file)</option>
                <option value="medium">Medium (Recommended)</option>
                <option value="high">High (Larger file)</option>
              </Select>
            </ControlGroup>
          </ControlsGrid>

          <AdvancedOptions>
            <AdvancedHeader>Advanced Options</AdvancedHeader>
            <CheckboxGroup>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                />
                Maintain aspect ratio
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={optimizeColors}
                  onChange={(e) => setOptimizeColors(e.target.checked)}
                />
                Optimize color palette (better quality, slower conversion)
              </CheckboxLabel>
            </CheckboxGroup>
          </AdvancedOptions>

          {estimatedSize > 8 && (
            <WarningText>
              ⚠️ Estimated file size may exceed Discord's 8MB limit for free users
            </WarningText>
          )}

          <ProcessButton 
            onClick={handleProcess} 
            disabled={!width || !height || endTime <= startTime || isProcessing || !ffmpegLoaded}
          >
            {isProcessing ? 'Converting...' : `Convert to GIF (${formatTime(endTime - startTime)})`}
          </ProcessButton>

          {outputGif && (
            <DownloadButton onClick={downloadGif}>
              📥 Download GIF ({outputGif.size} MB)
            </DownloadButton>
          )}
        </ControlsSection>
      )}
    </Container>
  );
}

export default VideoToGif;