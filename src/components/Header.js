import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import LanguageSelector from './LanguageSelector';

const HeaderContainer = styled.div`
  background-color: var(--discord-darker);
  border-bottom: 1px solid var(--discord-dark);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
  animation: slideInDown 0.4s ease-out;
  
  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ToolIcon = styled.div`
  font-size: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--discord-light);
  border-radius: 6px;
  transition: all 0.3s ease;
  animation: bounceIn 0.6s ease-out 0.2s both;
  
  &:hover {
    transform: scale(1.1) rotate(5deg);
    background: linear-gradient(135deg, var(--discord-blurple), var(--discord-fuchsia));
    color: white;
  }
  
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ToolName = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: var(--discord-header-primary);
  margin: 0;
  animation: fadeInRight 0.5s ease-out 0.3s both;
  
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const ToolDescription = styled.p`
  font-size: 14px;
  color: var(--discord-text-muted);
  margin: 0;
  animation: fadeInRight 0.5s ease-out 0.4s both;
  
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatusBadge = styled.div`
  padding: 4px 8px;
  background-color: var(--discord-green);
  color: var(--discord-white);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

const toolInfo = {
  '/dashboard': {
    name: 'Dashboard',
    description: 'Overview of all Discord utility tools',
    icon: '🏠'
  },
  '/banner-resizer': {
    name: 'Banner Resizer',
    description: 'Resize images to Discord banner format (600×240)',
    icon: '🖼️'
  },
  '/avatar-cropper': {
    name: 'Avatar Cropper',
    description: 'Crop images for Discord profile pictures',
    icon: '✂️'
  },
  '/emoji-maker': {
    name: 'Emoji Maker',
    description: 'Create Discord emojis (128×128, <256KB)',
    icon: '😀'
  },
  '/sticker-converter': {
    name: 'Sticker Converter',
    description: 'Convert images to Discord sticker format',
    icon: '🏷️'
  },
  '/gif-resizer': {
    name: 'GIF Resizer',
    description: 'Resize and compress GIFs for Discord',
    icon: '📐'
  },
  '/gif-speed': {
    name: 'GIF Speed Adjuster',
    description: 'Adjust GIF animation speed',
    icon: '⚡'
  },
  '/video-to-gif': {
    name: 'Video to GIF',
    description: 'Convert video clips to Discord-friendly GIFs',
    icon: '🎬'
  },
  '/nitro-preview': {
    name: 'Nitro Preview',
    description: 'Preview animations as if you had Discord Nitro',
    icon: '💎'
  },
  '/color-picker': {
    name: 'Color Picker',
    description: 'Pick colors for Discord themes and embeds',
    icon: '🎨'
  },
  '/embed-builder': {
    name: 'Embed Builder',
    description: 'Create Discord embeds with live preview',
    icon: '📝'
  },
  '/status-generator': {
    name: 'Status Generator',
    description: 'Generate custom Discord status messages',
    icon: '💬'
  },
  '/markdown-playground': {
    name: 'Markdown Playground',
    description: 'Test Discord markdown formatting',
    icon: '📄'
  },
  '/image-optimizer': {
    name: 'Image Optimizer',
    description: 'Optimize images for Discord file size limits',
    icon: '⚙️'
  },
  '/safe-zone-overlay': {
    name: 'Safe Zone Overlay',
    description: 'Preview banners with Discord UI overlay',
    icon: '🛡️'
  },
  '/quick-share': {
    name: 'Quick Share',
    description: 'Quickly compress and share files',
    icon: '🚀'
  }
};

function Header() {
  const location = useLocation();
  const { t } = useTranslation();
  const currentTool = toolInfo[location.pathname] || toolInfo['/dashboard'];

  return (
    <HeaderContainer>
      <HeaderLeft>
        <ToolIcon>{currentTool.icon}</ToolIcon>
        <HeaderInfo>
          <ToolName>{currentTool.name}</ToolName>
          <ToolDescription>{currentTool.description}</ToolDescription>
        </HeaderInfo>
      </HeaderLeft>
      <HeaderRight>
        <LanguageSelector />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;