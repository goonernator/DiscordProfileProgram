import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const WelcomeTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: var(--discord-header-primary);
  margin-bottom: 12px;
`;

const WelcomeSubtitle = styled.p`
  font-size: 18px;
  color: var(--discord-text-muted);
  margin-bottom: 24px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, var(--discord-light) 0%, var(--discord-lighter) 100%);
  border: 2px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 4px 15px rgba(88, 101, 242, 0.1);
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, var(--discord-blurple), var(--discord-fuchsia));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
  &:nth-child(4) { animation-delay: 0.4s; }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 35px rgba(88, 101, 242, 0.3);
    border-color: var(--discord-blurple);
    
    &::before {
      opacity: 0.1;
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StatNumber = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: var(--discord-blurple);
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: var(--discord-text-muted);
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

const ToolCategory = styled.div`
  background: linear-gradient(135deg, var(--discord-darker) 0%, var(--discord-light) 100%);
  border: 2px solid var(--discord-blurple);
  border-radius: 12px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: slideInUp 0.8s ease-out;
  animation-fill-mode: both;
  box-shadow: 0 8px 25px rgba(88, 101, 242, 0.15);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, var(--discord-blurple), var(--discord-green));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:nth-child(1) { animation-delay: 0.5s; }
  &:nth-child(2) { animation-delay: 0.6s; }
  &:nth-child(3) { animation-delay: 0.7s; }
  &:nth-child(4) { animation-delay: 0.8s; }
  
  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 20px 40px rgba(88, 101, 242, 0.25);
    border-color: var(--discord-green);
    
    &::before {
      opacity: 0.08;
    }
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(40px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const CategoryIcon = styled.div`
  font-size: 24px;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--discord-blurple), var(--discord-fuchsia));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(88, 101, 242, 0.4);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 6px 20px rgba(88, 101, 242, 0.6);
  }
`;

const CategoryTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--discord-header-primary);
  margin: 0;
`;

const ToolsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ToolItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: var(--discord-light);
  border-radius: 6px;
  text-decoration: none;
  color: var(--discord-text-normal);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background-color: var(--discord-lighter);
    transform: translateY(-2px) translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    &::before {
      left: 100%;
    }
  }
`;

const ToolItemIcon = styled.span`
  font-size: 16px;
  transition: all 0.3s ease;
  
  ${ToolItem}:hover & {
    transform: scale(1.3) rotate(15deg);
  }
`;

const ToolItemInfo = styled.div`
  flex: 1;
`;

const ToolItemName = styled.div`
  font-weight: 500;
  color: var(--discord-header-primary);
  margin-bottom: 2px;
`;

const ToolItemDesc = styled.div`
  font-size: 12px;
  color: var(--discord-text-muted);
`;

const toolCategories = [
  {
    title: 'Image & Banner Tools',
    icon: '🎨',
    tools: [
      { name: 'Banner Resizer', path: '/banner-resizer', icon: '🖼️', desc: 'Auto-format to 600×240' },
      { name: 'Avatar Cropper', path: '/avatar-cropper', icon: '✂️', desc: 'Circle crop preview' },
      { name: 'Emoji Maker', path: '/emoji-maker', icon: '😀', desc: 'Resize to 128×128, <256KB' },
      { name: 'Sticker Converter', path: '/sticker-converter', icon: '🏷️', desc: 'Discord sticker format' }
    ]
  },
  {
    title: 'GIF & Media Tools',
    icon: '🎥',
    tools: [
      { name: 'GIF Resizer', path: '/gif-resizer', icon: '📐', desc: 'Downscale & compress' },
      { name: 'GIF Speed Adjuster', path: '/gif-speed', icon: '⚡', desc: 'Slow down / speed up' },
      { name: 'Video to GIF', path: '/video-to-gif', icon: '🎬', desc: 'Trim & export clips' },
      { name: 'Nitro Preview', path: '/nitro-preview', icon: '💎', desc: 'Preview with Nitro' }
    ]
  },
  {
    title: 'Quality of Life',
    icon: '🛠️',
    tools: [
      { name: 'Color Picker', path: '/color-picker', icon: '🎨', desc: 'Hex codes for themes' },
      { name: 'Embed Builder', path: '/embed-builder', icon: '📝', desc: 'GUI for Discord embeds' },
      { name: 'Status Generator', path: '/status-generator', icon: '💬', desc: 'Custom status messages' },
      { name: 'Markdown Playground', path: '/markdown-playground', icon: '📄', desc: 'Live markdown preview' }
    ]
  },
  {
    title: 'Integration & Bonus',
    icon: '🌐',
    tools: [
      { name: 'Image Optimizer', path: '/image-optimizer', icon: '⚙️', desc: 'Lossless optimization' },
      { name: 'Safe Zone Overlay', path: '/safe-zone-overlay', icon: '🛡️', desc: 'Preview with UI overlay' },
      { name: 'Quick Share', path: '/quick-share', icon: '🚀', desc: 'Drag, drop, compress' }
    ]
  }
];

function Dashboard() {
  const { t } = useTranslation();

  return (
    <DashboardContainer className="fade-in">
      <WelcomeSection>
        <WelcomeTitle>{t('dashboard.welcome')}</WelcomeTitle>
        <WelcomeSubtitle>
          {t('header.subtitle')}
        </WelcomeSubtitle>
      </WelcomeSection>

      <StatsGrid>
        <StatCard>
          <StatNumber>15</StatNumber>
          <StatLabel>Total Tools</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>4</StatNumber>
          <StatLabel>Categories</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>∞</StatNumber>
          <StatLabel>Possibilities</StatLabel>
        </StatCard>
      </StatsGrid>

      <ToolsGrid>
        {toolCategories.map((category, index) => (
          <ToolCategory key={index}>
            <CategoryHeader>
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryTitle>{category.title}</CategoryTitle>
            </CategoryHeader>
            <ToolsList>
              {category.tools.map((tool, toolIndex) => (
                <ToolItem key={toolIndex} to={tool.path}>
                  <ToolItemIcon>{tool.icon}</ToolItemIcon>
                  <ToolItemInfo>
                    <ToolItemName>{tool.name}</ToolItemName>
                    <ToolItemDesc>{tool.desc}</ToolItemDesc>
                  </ToolItemInfo>
                </ToolItem>
              ))}
            </ToolsList>
          </ToolCategory>
        ))}
      </ToolsGrid>
    </DashboardContainer>
  );
}

export default Dashboard;