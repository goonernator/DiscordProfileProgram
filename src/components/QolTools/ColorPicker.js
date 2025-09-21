import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
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

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
`;

const ColorSwatch = styled.div`
  width: 80px;
  height: 60px;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid ${props => props.selected ? 'var(--discord-blurple)' : 'transparent'};
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

const ColorLabel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  text-align: center;
`;

const CustomColorSection = styled.div`
  margin-top: 20px;
`;

const ColorInput = styled.input`
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 16px;
`;

const ColorInfo = styled.div`
  background-color: var(--discord-dark);
  border-radius: 6px;
  padding: 20px;
  margin-top: 20px;
`;

const ColorValue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px 12px;
  background-color: var(--discord-darker);
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CopyButton = styled.button`
  background-color: var(--discord-blurple);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--discord-blurple-dark);
  }
`;

const PreviewSection = styled.div`
  grid-column: 1 / -1;
  background-color: var(--discord-darker);
  border: 1px solid var(--discord-dark);
  border-radius: 8px;
  padding: 24px;
`;

const EmbedPreview = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background-color: var(--discord-dark);
  border-left: 4px solid ${props => props.color || '#5865F2'};
  border-radius: 4px;
  padding: 16px;
  color: var(--discord-text-normal);
`;

const EmbedTitle = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  color: ${props => props.color || '#5865F2'};
`;

const EmbedDescription = styled.div`
  font-size: 14px;
  line-height: 1.4;
  color: var(--discord-text-muted);
`;

const discordColors = [
  { name: 'Blurple', hex: '#5865F2', rgb: '88, 101, 242' },
  { name: 'Green', hex: '#57F287', rgb: '87, 242, 135' },
  { name: 'Yellow', hex: '#FEE75C', rgb: '254, 231, 92' },
  { name: 'Fuchsia', hex: '#EB459E', rgb: '235, 69, 158' },
  { name: 'Red', hex: '#ED4245', rgb: '237, 66, 69' },
  { name: 'White', hex: '#FFFFFF', rgb: '255, 255, 255' },
  { name: 'Black', hex: '#000000', rgb: '0, 0, 0' },
  { name: 'Dark Grey', hex: '#36393F', rgb: '54, 57, 63' },
  { name: 'Grey', hex: '#747F8D', rgb: '116, 127, 141' },
  { name: 'Light Grey', hex: '#99AAB5', rgb: '153, 170, 181' },
  { name: 'Orange', hex: '#FF7A00', rgb: '255, 122, 0' },
  { name: 'Purple', hex: '#9C84EF', rgb: '156, 132, 239' },
];

function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#5865F2');
  const [customColor, setCustomColor] = useState('#5865F2');

  const hexToRgb = useCallback((hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }, []);

  const hexToDecimal = useCallback((hex) => {
    return parseInt(hex.replace('#', ''), 16);
  }, []);

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text);
  }, []);

  const handleColorSelect = useCallback((color) => {
    setSelectedColor(color);
    setCustomColor(color);
  }, []);

  const rgb = hexToRgb(selectedColor);
  const decimal = hexToDecimal(selectedColor);

  return (
    <Container className="fade-in">
      <Grid>
        <Section>
          <SectionTitle>
            🎨 Discord Color Palette
          </SectionTitle>
          <ColorGrid>
            {discordColors.map((color) => (
              <ColorSwatch
                key={color.name}
                style={{ backgroundColor: color.hex }}
                selected={selectedColor === color.hex}
                onClick={() => handleColorSelect(color.hex)}
              >
                <ColorLabel>{color.name}</ColorLabel>
              </ColorSwatch>
            ))}
          </ColorGrid>
        </Section>

        <Section>
          <SectionTitle>
            🖌️ Custom Color
          </SectionTitle>
          <ColorInput
            type="color"
            value={customColor}
            onChange={(e) => {
              setCustomColor(e.target.value);
              setSelectedColor(e.target.value);
            }}
          />
          
          <ColorInfo>
            <ColorValue>
              <span>HEX:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{selectedColor.toUpperCase()}</span>
                <CopyButton onClick={() => copyToClipboard(selectedColor.toUpperCase())}>
                  Copy
                </CopyButton>
              </div>
            </ColorValue>
            
            <ColorValue>
              <span>RGB:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : 'Invalid'}</span>
                <CopyButton onClick={() => copyToClipboard(rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : '')}>
                  Copy
                </CopyButton>
              </div>
            </ColorValue>
            
            <ColorValue>
              <span>Decimal:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{decimal}</span>
                <CopyButton onClick={() => copyToClipboard(decimal.toString())}>
                  Copy
                </CopyButton>
              </div>
            </ColorValue>
            
            <ColorValue>
              <span>CSS:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>color: {selectedColor};</span>
                <CopyButton onClick={() => copyToClipboard(`color: ${selectedColor};`)}>
                  Copy
                </CopyButton>
              </div>
            </ColorValue>
          </ColorInfo>
        </Section>

        <PreviewSection>
          <SectionTitle>
            👀 Embed Preview
          </SectionTitle>
          <EmbedPreview color={selectedColor}>
            <EmbedTitle color={selectedColor}>
              Sample Embed Title
            </EmbedTitle>
            <EmbedDescription>
              This is how your selected color will look in a Discord embed. 
              The color appears in the title and as the left border accent.
            </EmbedDescription>
          </EmbedPreview>
        </PreviewSection>
      </Grid>
    </Container>
  );
}

export default ColorPicker;