import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 280px;
  background-color: var(--discord-darker);
  border-right: 1px solid var(--discord-dark);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  animation: slideInLeft 0.3s ease-out;
  
  @keyframes slideInLeft {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const SidebarHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--discord-dark);
  background-color: var(--discord-darker);
`;

const AppTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: var(--discord-header-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: fadeInDown 0.5s ease-out 0.2s both;
  
  @keyframes fadeInDown {
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

const AppIcon = styled.div`
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, var(--discord-blurple), var(--discord-fuchsia));
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
  color: white;
  transition: all 0.3s ease;
  animation: bounceIn 0.6s ease-out 0.4s both;
  
  &:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 4px 12px rgba(88, 101, 242, 0.4);
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

const NavSection = styled.div`
  padding: 16px 0;
`;

const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  color: var(--discord-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 20px 8px 20px;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  color: var(--discord-channels-default);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 12px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: linear-gradient(135deg, var(--discord-blurple), var(--discord-fuchsia));
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background-color: var(--discord-light);
    color: var(--discord-interactive-hover);
    transform: translateX(4px);
    
    &::before {
      transform: translateX(0);
    }
  }
  
  &.active {
    background-color: var(--discord-light);
    color: var(--discord-interactive-active);
    
    &::before {
      transform: translateX(0);
    }
  }
`;

const NavIcon = styled.span`
  font-size: 16px;
  width: 20px;
  text-align: center;
  transition: all 0.3s ease;
  
  ${NavItem}:hover & {
    transform: scale(1.2) rotate(10deg);
  }
`;

function Sidebar() {
  const location = useLocation();
  const { t } = useTranslation();

  const toolCategories = [
    {
      title: t('nav.dashboard'),
      items: [
        { name: t('nav.dashboard'), path: '/dashboard', icon: '🏠' }
      ]
    },
    {
      title: t('nav.imageTools'),
      items: [
        { name: 'Banner Resizer', path: '/banner-resizer', icon: '🖼️' },
        { name: 'Avatar Cropper', path: '/avatar-cropper', icon: '✂️' },
        { name: 'Emoji Maker', path: '/emoji-maker', icon: '😀' },
        { name: 'Sticker Converter', path: '/sticker-converter', icon: '🏷️' }
      ]
    },
    {
      title: t('nav.gifTools'),
      items: [
        { name: 'GIF Resizer', path: '/gif-resizer', icon: '📐' },
        { name: t('gifTools.speedAdjuster'), path: '/gif-speed', icon: '⚡' },
        { name: 'Video to GIF', path: '/video-to-gif', icon: '🎬' },
        { name: 'Nitro Preview', path: '/nitro-preview', icon: '💎' }
      ]
    },
    {
      title: t('nav.qolTools'),
      items: [
        { name: 'Color Picker', path: '/color-picker', icon: '🎨' },
        { name: 'Embed Builder', path: '/embed-builder', icon: '📝' },
        { name: 'Status Generator', path: '/status-generator', icon: '💬' },
        { name: 'Markdown Playground', path: '/markdown-playground', icon: '📄' }
      ]
    },
    {
      title: t('nav.integrationTools'),
      items: [
        { name: t('integrationTools.imageOptimizer'), path: '/image-optimizer', icon: '⚙️' },
        { name: 'Safe Zone Overlay', path: '/safe-zone-overlay', icon: '🛡️' },
        { name: t('integrationTools.quickShare'), path: '/quick-share', icon: '🚀' }
      ]
    }
  ];

  return (
    <SidebarContainer>
      <SidebarHeader>
        <AppTitle>
          <AppIcon>DU</AppIcon>
          {t('header.title')}
        </AppTitle>
      </SidebarHeader>
      
      {toolCategories.map((category, index) => (
        <NavSection key={index}>
          <SectionTitle>{category.title}</SectionTitle>
          {category.items.map((item, itemIndex) => (
            <NavItem
              key={itemIndex}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              <NavIcon>{item.icon}</NavIcon>
              {item.name}
            </NavItem>
          ))}
        </NavSection>
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;