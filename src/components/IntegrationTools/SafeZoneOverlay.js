import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
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

const PreviewSection = styled.div`
  background-color: var(--discord-darker);
  border: 1px solid var(--discord-dark);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 30px;
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

const OverlayContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--discord-dark);
`;

const BannerImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  display: block;
`;

const DiscordOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const ProfileSection = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  align-items: flex-end;
  gap: 16px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(45deg, #5865f2, #7289da);
  border: 6px solid var(--discord-darker);
  flex-shrink: 0;
  position: relative;
  
  &::after {
    content: '👤';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 32px;
  }
`;

const UserInfo = styled.div`
  flex: 1;
  margin-bottom: 8px;
`;

const Username = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  margin-bottom: 4px;
`;

const Discriminator = styled.div`
  font-size: 16px;
  color: #b9bbbe;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
`;

const BadgesSection = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const Badge = styled.div`
  width: 22px;
  height: 22px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const ControlsSection = styled.div`
  background-color: var(--discord-darker);
  border: 1px solid var(--discord-dark);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
`;

const ControlGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: var(--discord-text-normal);
`;

const Input = styled.input`
  padding: 8px 12px;
  background-color: var(--discord-dark);
  border: 1px solid var(--discord-input-border);
  border-radius: 4px;
  color: var(--discord-text-normal);
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: var(--discord-blurple);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: var(--discord-blurple);
`;

const OverlayToggle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-top: 16px;
`;

const ToggleButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.active ? 'var(--discord-blurple)' : 'var(--discord-dark)'};
  color: ${props => props.active ? 'white' : 'var(--discord-text-normal)'};
  border: 1px solid ${props => props.active ? 'var(--discord-blurple)' : 'var(--discord-input-border)'};
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? 'var(--discord-blurple-dark)' : 'var(--discord-darker)'};
  }
`;

const SafeZoneGuides = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: ${props => props.show ? 0.8 : 0};
  transition: opacity 0.3s ease;
`;

const SafeZoneLine = styled.div`
  position: absolute;
  background-color: #ff6b6b;
  
  &.horizontal {
    left: 0;
    right: 0;
    height: 2px;
    top: ${props => props.position}px;
  }
  
  &.vertical {
    top: 0;
    bottom: 0;
    width: 2px;
    left: ${props => props.position}px;
  }
`;

const SafeZoneLabel = styled.div`
  position: absolute;
  background-color: rgba(255, 107, 107, 0.9);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
`;

function SafeZoneOverlay() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [username, setUsername] = useState('YourUsername');
  const [discriminator, setDiscriminator] = useState('#1234');
  const [showSafeZones, setShowSafeZones] = useState(true);
  const [showProfile, setShowProfile] = useState(true);
  const [showBadges, setShowBadges] = useState(true);
  const [overlayType, setOverlayType] = useState('desktop');
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
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

  const getSafeZoneData = () => {
    switch (overlayType) {
      case 'desktop':
        return {
          profileBottom: 16,
          profileLeft: 16,
          profileRight: 16,
          avatarSize: 80,
          usernameHeight: 24
        };
      case 'mobile':
        return {
          profileBottom: 12,
          profileLeft: 12,
          profileRight: 12,
          avatarSize: 64,
          usernameHeight: 20
        };
      case 'tablet':
        return {
          profileBottom: 14,
          profileLeft: 14,
          profileRight: 14,
          avatarSize: 72,
          usernameHeight: 22
        };
      default:
        return {
          profileBottom: 16,
          profileLeft: 16,
          profileRight: 16,
          avatarSize: 80,
          usernameHeight: 24
        };
    }
  };

  const safeZoneData = getSafeZoneData();

  return (
    <Container className="fade-in">
      <Header>
        <Title>🛡️ Safe Zone Overlay</Title>
        <Subtitle>Preview how your banner looks with Discord UI overlays</Subtitle>
      </Header>

      <UploadSection
        className={isDragOver ? 'dragover' : ''}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadIcon>🛡️</UploadIcon>
        <UploadText>Drop your banner image here</UploadText>
        <UploadSubtext>or click to browse files</UploadSubtext>
        <SupportedFormats>
          Supports: JPG, PNG, WebP, GIF (600x240 recommended)
        </SupportedFormats>
        <HiddenInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
        />
      </UploadSection>

      {imageUrl && (
        <>
          <PreviewSection>
            <SectionTitle>👁️ Banner Preview with Discord UI</SectionTitle>
            <OverlayContainer>
              <BannerImage src={imageUrl} alt="Banner Preview" />
              
              <DiscordOverlay>
                {showProfile && (
                  <ProfileSection>
                    <Avatar style={{ 
                      width: `${safeZoneData.avatarSize}px`, 
                      height: `${safeZoneData.avatarSize}px` 
                    }} />
                    <UserInfo>
                      {showBadges && (
                        <BadgesSection>
                          <Badge>💎</Badge>
                          <Badge>🎵</Badge>
                          <Badge>⚡</Badge>
                        </BadgesSection>
                      )}
                      <Username style={{ fontSize: `${safeZoneData.usernameHeight}px` }}>
                        {username}
                      </Username>
                      <Discriminator>
                        {discriminator}
                      </Discriminator>
                    </UserInfo>
                  </ProfileSection>
                )}
                
                <SafeZoneGuides show={showSafeZones}>
                  {/* Bottom safe zone */}
                  <SafeZoneLine 
                    className="horizontal" 
                    position={240 - safeZoneData.profileBottom - safeZoneData.avatarSize - 20}
                  />
                  <SafeZoneLabel style={{ 
                    bottom: `${safeZoneData.profileBottom + safeZoneData.avatarSize + 25}px`, 
                    left: '16px' 
                  }}>
                    Safe Zone (Profile Area)
                  </SafeZoneLabel>
                  
                  {/* Left safe zone */}
                  <SafeZoneLine 
                    className="vertical" 
                    position={safeZoneData.profileLeft}
                  />
                  
                  {/* Right safe zone */}
                  <SafeZoneLine 
                    className="vertical" 
                    position={600 - safeZoneData.profileRight}
                  />
                  
                  {/* Top safe zone for mobile */}
                  {overlayType === 'mobile' && (
                    <>
                      <SafeZoneLine className="horizontal" position={20} />
                      <SafeZoneLabel style={{ top: '25px', left: '16px' }}>
                        Mobile Header Area
                      </SafeZoneLabel>
                    </>
                  )}
                </SafeZoneGuides>
              </DiscordOverlay>
            </OverlayContainer>
          </PreviewSection>

          <ControlsSection>
            <SectionTitle>⚙️ Preview Controls</SectionTitle>
            
            <ControlGrid>
              <ControlGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                />
              </ControlGroup>
              
              <ControlGroup>
                <Label>Discriminator</Label>
                <Input
                  type="text"
                  value={discriminator}
                  onChange={(e) => setDiscriminator(e.target.value)}
                  placeholder="#1234"
                />
              </ControlGroup>
              
              <ControlGroup>
                <CheckboxGroup>
                  <Checkbox
                    type="checkbox"
                    checked={showProfile}
                    onChange={(e) => setShowProfile(e.target.checked)}
                  />
                  <Label>Show Profile Overlay</Label>
                </CheckboxGroup>
              </ControlGroup>
              
              <ControlGroup>
                <CheckboxGroup>
                  <Checkbox
                    type="checkbox"
                    checked={showBadges}
                    onChange={(e) => setShowBadges(e.target.checked)}
                  />
                  <Label>Show Badges</Label>
                </CheckboxGroup>
              </ControlGroup>
              
              <ControlGroup>
                <CheckboxGroup>
                  <Checkbox
                    type="checkbox"
                    checked={showSafeZones}
                    onChange={(e) => setShowSafeZones(e.target.checked)}
                  />
                  <Label>Show Safe Zone Guides</Label>
                </CheckboxGroup>
              </ControlGroup>
            </ControlGrid>

            <Label>Device Type</Label>
            <OverlayToggle>
              <ToggleButton
                active={overlayType === 'desktop'}
                onClick={() => setOverlayType('desktop')}
              >
                🖥️ Desktop
              </ToggleButton>
              <ToggleButton
                active={overlayType === 'tablet'}
                onClick={() => setOverlayType('tablet')}
              >
                📱 Tablet
              </ToggleButton>
              <ToggleButton
                active={overlayType === 'mobile'}
                onClick={() => setOverlayType('mobile')}
              >
                📱 Mobile
              </ToggleButton>
            </OverlayToggle>
          </ControlsSection>
        </>
      )}
    </Container>
  );
}

export default SafeZoneOverlay;