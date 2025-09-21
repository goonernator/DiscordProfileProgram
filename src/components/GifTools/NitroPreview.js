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

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PreviewCard = styled.div`
  background-color: var(--discord-dark);
  border-radius: 8px;
  padding: 16px;
  border: 2px solid ${props => props.isNitro ? '#ff73fa' : 'var(--discord-darker)'};
`;

const PreviewTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.isNitro ? '#ff73fa' : 'var(--discord-header-primary)'};
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NitroIcon = styled.span`
  font-size: 16px;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 4px;
  object-fit: contain;
`;

const FileInfo = styled.div`
  background-color: var(--discord-darker);
  border-radius: 4px;
  padding: 12px;
  margin-top: 12px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 12px;
  
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

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
`;

const FeatureCard = styled.div`
  background-color: var(--discord-dark);
  border-radius: 8px;
  padding: 20px;
  border: 2px solid ${props => props.available ? '#57f287' : '#ed4245'};
`;

const FeatureTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: var(--discord-header-primary);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FeatureStatus = styled.span`
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  background-color: ${props => props.available ? '#57f287' : '#ed4245'};
  color: white;
  font-weight: 500;
`;

const FeatureDescription = styled.p`
  font-size: 14px;
  color: var(--discord-text-muted);
  margin-bottom: 12px;
`;

const FeatureDetails = styled.div`
  font-size: 12px;
  color: var(--discord-text-muted);
`;

const ComparisonSection = styled.div`
  background-color: var(--discord-dark);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const ComparisonHeader = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: var(--discord-header-primary);
  margin-bottom: 16px;
`;

const ComparisonTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1px;
  background-color: var(--discord-darker);
  border-radius: 4px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  background-color: var(--discord-darker);
  padding: 12px;
  font-weight: 600;
  font-size: 14px;
  color: var(--discord-header-primary);
  text-align: center;
`;

const TableCell = styled.div`
  background-color: var(--discord-dark);
  padding: 12px;
  font-size: 14px;
  color: var(--discord-text-normal);
  text-align: center;
`;

const NitroCell = styled(TableCell)`
  color: #ff73fa;
  font-weight: 500;
`;

const WarningBox = styled.div`
  background-color: rgba(250, 166, 26, 0.1);
  border: 1px solid #faa61a;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`;

const WarningTitle = styled.h4`
  color: #faa61a;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const WarningText = styled.p`
  color: var(--discord-text-normal);
  font-size: 14px;
  margin: 0;
`;

function NitroPreview() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      setSelectedFile(file);
      
      const fileSize = file.size / 1024 / 1024; // MB
      const isAnimated = file.type === 'image/gif' || file.type.startsWith('video/');
      
      // Enhanced file analysis
      const canUseAsEmoji = fileSize <= 0.256 && (file.type === 'image/png' || file.type === 'image/gif');
      const canUseAsAvatar = fileSize <= 8 && (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/gif');
      const canUseAsBanner = fileSize <= 8 && (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/gif');
      
      // Determine Nitro requirements
      const needsNitroForSize = fileSize > 8;
      const needsNitroForAnimation = isAnimated && file.type === 'image/gif' && (canUseAsAvatar || canUseAsBanner);
      const needsNitroForVideo = file.type.startsWith('video/');
      
      // Calculate upload limits
      const regularLimit = 8; // 8MB for regular users
      const nitroLimit = 100; // 100MB for Nitro users
      
      setFileInfo({
        name: file.name,
        size: fileSize.toFixed(2),
        type: file.type,
        isAnimated,
        canUseAsEmoji,
        canUseAsAvatar,
        canUseAsBanner,
        needsNitro: needsNitroForSize || needsNitroForAnimation || needsNitroForVideo,
        needsNitroReason: needsNitroForSize ? 'File size exceeds 8MB limit' : 
                         needsNitroForAnimation ? 'Animated profile pictures require Nitro' :
                         needsNitroForVideo ? 'Video files require Nitro' : null,
        canUploadRegular: fileSize <= regularLimit,
        canUploadNitro: fileSize <= nitroLimit,
        compressionSuggestion: fileSize > regularLimit && fileSize <= nitroLimit ? 
          `Consider compressing to under ${regularLimit}MB for regular Discord` : null
      });
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

  const features = [
    {
      title: "Animated Profile Pictures",
      available: fileInfo?.isAnimated && fileInfo?.canUseAsAvatar,
      description: "Use GIFs and videos as your profile picture",
      details: fileInfo ? `Your file: ${fileInfo.isAnimated ? 'Animated' : 'Static'} (${fileInfo.size}MB)` : "Upload a file to check"
    },
    {
      title: "Animated Server Icons",
      available: fileInfo?.isAnimated && fileInfo?.canUseAsAvatar,
      description: "Animated icons for servers you own",
      details: fileInfo ? `Server boost required + file under 8MB` : "Upload a file to check"
    },
    {
      title: "Custom Emojis (Animated)",
      available: fileInfo?.isAnimated && fileInfo?.canUseAsEmoji,
      description: "Upload animated emojis to servers",
      details: fileInfo ? `File must be under 256KB` : "Upload a file to check"
    },
    {
      title: "Profile Banner",
      available: fileInfo?.canUseAsBanner,
      description: "Custom banner for your profile",
      details: fileInfo ? `${fileInfo.canUseAsBanner ? 'Compatible' : 'Too large'} (${fileInfo.size}MB)` : "Upload a file to check"
    },
    {
      title: "Higher Upload Limit",
      available: fileInfo ? fileInfo.size <= 100 : false,
      description: "Upload files up to 100MB with Nitro",
      details: fileInfo ? `Your file: ${fileInfo.size}MB` : "Upload a file to check"
    },
    {
      title: "HD Video Streaming",
      available: true,
      description: "Stream and watch in 1080p 60fps",
      details: "Always available with Nitro"
    }
  ];

  return (
    <Container className="fade-in">
      <Header>
        <Title>💎 Nitro Preview</Title>
        <Subtitle>See how your media will look with Discord Nitro features</Subtitle>
      </Header>

      <MainContent>
        <UploadSection
          className={isDragOver ? 'dragover' : ''}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadIcon>💎</UploadIcon>
          <UploadText>Drop your media here</UploadText>
          <UploadSubtext>or click to browse files</UploadSubtext>
          <SupportedFormats>
            Supports: Images, GIFs, Videos
          </SupportedFormats>
          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileInputChange}
          />
        </UploadSection>

        <PreviewSection>
          <PreviewHeader>Nitro Preview</PreviewHeader>
          {selectedFile ? (
            <PreviewContainer>
              <PreviewCard isNitro={false}>
                <PreviewTitle isNitro={false}>
                  👤 Regular Discord
                </PreviewTitle>
                {selectedFile.type.startsWith('image/') ? (
                  <ImagePreview src={URL.createObjectURL(selectedFile)} alt="Preview" />
                ) : (
                  <video 
                    src={URL.createObjectURL(selectedFile)} 
                    controls 
                    style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }}
                  />
                )}
                <FileInfo>
                  <InfoRow>
                    <InfoLabel>Status:</InfoLabel>
                    <InfoValue style={{ color: fileInfo?.needsNitro ? '#faa61a' : '#43b581' }}>
                      {fileInfo?.needsNitro ? 'Requires Nitro' : 'Compatible'}
                    </InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>File Size:</InfoLabel>
                    <InfoValue>{fileInfo?.size} MB</InfoValue>
                  </InfoRow>
                  {fileInfo?.needsNitroReason && (
                    <InfoRow>
                      <InfoLabel>Reason:</InfoLabel>
                      <InfoValue style={{ color: '#faa61a', fontSize: '12px' }}>
                        {fileInfo.needsNitroReason}
                      </InfoValue>
                    </InfoRow>
                  )}
                  {fileInfo?.compressionSuggestion && (
                    <InfoRow>
                      <InfoLabel>Tip:</InfoLabel>
                      <InfoValue style={{ color: '#7289da', fontSize: '12px' }}>
                        {fileInfo.compressionSuggestion}
                      </InfoValue>
                    </InfoRow>
                  )}
                </FileInfo>
              </PreviewCard>

              <PreviewCard isNitro={true}>
                <PreviewTitle isNitro={true}>
                  <NitroIcon>💎</NitroIcon>
                  Discord Nitro
                </PreviewTitle>
                {selectedFile.type.startsWith('image/') ? (
                  <ImagePreview src={URL.createObjectURL(selectedFile)} alt="Nitro Preview" />
                ) : (
                  <video 
                    src={URL.createObjectURL(selectedFile)} 
                    controls 
                    style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }}
                  />
                )}
                <FileInfo>
                  <InfoRow>
                    <InfoLabel>Enhanced Features:</InfoLabel>
                    <InfoValue style={{ color: '#ff73fa' }}>Available</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Quality:</InfoLabel>
                    <InfoValue>Full Resolution</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Upload Limit:</InfoLabel>
                    <InfoValue style={{ color: '#ff73fa' }}>100 MB</InfoValue>
                  </InfoRow>
                  {fileInfo?.isAnimated && (
                    <InfoRow>
                      <InfoLabel>Animation:</InfoLabel>
                      <InfoValue style={{ color: '#ff73fa' }}>Supported</InfoValue>
                    </InfoRow>
                  )}
                </FileInfo>
              </PreviewCard>
            </PreviewContainer>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--discord-text-muted)', padding: '40px 0' }}>
              Upload a file to see Nitro preview
            </div>
          )}
        </PreviewSection>
      </MainContent>

      <ControlsSection>
        <ControlsHeader>Nitro Features Analysis</ControlsHeader>
        
        {fileInfo?.needsNitro && (
          <WarningBox>
            <WarningTitle>
              ⚠️ Nitro Required
            </WarningTitle>
            <WarningText>
              {fileInfo.needsNitroReason} {fileInfo.compressionSuggestion && `Tip: ${fileInfo.compressionSuggestion}`}
            </WarningText>
          </WarningBox>
        )}

        {fileInfo && !fileInfo.needsNitro && (
          <WarningBox style={{ backgroundColor: 'rgba(67, 181, 129, 0.1)', borderColor: '#43b581' }}>
            <WarningTitle style={{ color: '#43b581' }}>
              ✅ Compatible with Regular Discord
            </WarningTitle>
            <WarningText>
              Your file is compatible with regular Discord and doesn't require Nitro!
            </WarningText>
          </WarningBox>
        )}

        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index} available={feature.available}>
              <FeatureTitle>
                {feature.title}
                <FeatureStatus available={feature.available}>
                  {feature.available ? 'Available' : 'Unavailable'}
                </FeatureStatus>
              </FeatureTitle>
              <FeatureDescription>
                {feature.description}
              </FeatureDescription>
              <FeatureDetails>
                {feature.details}
              </FeatureDetails>
            </FeatureCard>
          ))}
        </FeatureGrid>

        <ComparisonSection>
          <ComparisonHeader>Discord vs Discord Nitro</ComparisonHeader>
          <ComparisonTable>
            <TableHeader>Feature</TableHeader>
            <TableHeader>Regular Discord</TableHeader>
            <TableHeader>Discord Nitro</TableHeader>
            
            <TableCell>File Upload Limit</TableCell>
            <TableCell>8 MB</TableCell>
            <NitroCell>100 MB</NitroCell>
            
            <TableCell>Animated Profile Picture</TableCell>
            <TableCell>❌</TableCell>
            <NitroCell>✅</NitroCell>
            
            <TableCell>Custom Emojis</TableCell>
            <TableCell>Static only</TableCell>
            <NitroCell>Animated + Static</NitroCell>
            
            <TableCell>Video Quality</TableCell>
            <TableCell>720p</TableCell>
            <NitroCell>1080p 60fps</NitroCell>
            
            <TableCell>Profile Banner</TableCell>
            <TableCell>❌</TableCell>
            <NitroCell>✅</NitroCell>
            
            <TableCell>Server Boost</TableCell>
            <TableCell>❌</TableCell>
            <NitroCell>2 Boosts Included</NitroCell>
          </ComparisonTable>
        </ComparisonSection>
      </ControlsSection>
    </Container>
  );
}

export default NitroPreview;