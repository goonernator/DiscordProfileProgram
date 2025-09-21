import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './i18n'; // Initialize i18n
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import BannerResizer from './components/ImageTools/BannerResizer';
import AvatarCropper from './components/ImageTools/AvatarCropper';
import EmojiMaker from './components/ImageTools/EmojiMaker';
import StickerConverter from './components/ImageTools/StickerConverter';
import GifResizer from './components/GifTools/GifResizer';
import GifSpeedAdjuster from './components/GifTools/GifSpeedAdjuster';
import VideoToGif from './components/GifTools/VideoToGif';
import NitroPreview from './components/GifTools/NitroPreview';
import ColorPicker from './components/QolTools/ColorPicker';
import EmbedBuilder from './components/QolTools/EmbedBuilder';
import StatusGenerator from './components/QolTools/StatusGenerator';
import MarkdownPlayground from './components/QolTools/MarkdownPlayground';
import ImageOptimizer from './components/IntegrationTools/ImageOptimizer';
import SafeZoneOverlay from './components/IntegrationTools/SafeZoneOverlay';
import QuickShare from './components/IntegrationTools/QuickShare';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: var(--discord-dark);
  animation: fadeIn 0.5s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: linear-gradient(135deg, var(--discord-dark) 0%, var(--discord-darker) 100%);
  position: relative;
  animation: slideInUp 0.6s ease-out 0.2s both;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(88, 101, 242, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(235, 69, 158, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
  
  @keyframes slideInUp {
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

function App() {
  const [currentTool, setCurrentTool] = useState('dashboard');

  return (
    <AppContainer>
      <Sidebar currentTool={currentTool} setCurrentTool={setCurrentTool} />
      <MainContent>
        <Header currentTool={currentTool} />
        <ContentArea>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Image & Banner Tools */}
            <Route path="/banner-resizer" element={<BannerResizer />} />
            <Route path="/avatar-cropper" element={<AvatarCropper />} />
            <Route path="/emoji-maker" element={<EmojiMaker />} />
            <Route path="/sticker-converter" element={<StickerConverter />} />
            
            {/* GIF & Media Tools */}
            <Route path="/gif-resizer" element={<GifResizer />} />
            <Route path="/gif-speed" element={<GifSpeedAdjuster />} />
            <Route path="/video-to-gif" element={<VideoToGif />} />
            <Route path="/nitro-preview" element={<NitroPreview />} />
            
            {/* Quality of Life Tools */}
            <Route path="/color-picker" element={<ColorPicker />} />
            <Route path="/embed-builder" element={<EmbedBuilder />} />
            <Route path="/status-generator" element={<StatusGenerator />} />
            <Route path="/markdown-playground" element={<MarkdownPlayground />} />
            
            {/* Integration Tools */}
            <Route path="/image-optimizer" element={<ImageOptimizer />} />
            <Route path="/safe-zone-overlay" element={<SafeZoneOverlay />} />
            <Route path="/quick-share" element={<QuickShare />} />
          </Routes>
        </ContentArea>
      </MainContent>
    </AppContainer>
  );
}

export default App;