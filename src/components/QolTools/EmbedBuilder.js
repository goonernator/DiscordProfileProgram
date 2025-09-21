import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 1024px) {
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
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--discord-text-normal);
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background-color: var(--discord-dark);
  border: 1px solid var(--discord-input-border);
  border-radius: 4px;
  color: var(--discord-text-normal);
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--discord-blurple);
  }

  &::placeholder {
    color: var(--discord-text-muted);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  background-color: var(--discord-dark);
  border: 1px solid var(--discord-input-border);
  border-radius: 4px;
  color: var(--discord-text-normal);
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--discord-blurple);
  }

  &::placeholder {
    color: var(--discord-text-muted);
  }
`;

const ColorInput = styled.input`
  width: 60px;
  height: 40px;
  padding: 0;
  border: 1px solid var(--discord-input-border);
  border-radius: 4px;
  cursor: pointer;
  background: none;
`;

const PreviewSection = styled.div`
  position: sticky;
  top: 20px;
`;

const EmbedPreview = styled.div`
  background-color: var(--discord-dark);
  border-left: 4px solid ${props => props.color || '#5865F2'};
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 20px;
  max-width: 520px;
`;

const EmbedAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--discord-text-normal);
`;

const AuthorIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
`;

const EmbedTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.url ? 'var(--discord-link)' : 'var(--discord-text-normal)'};
  margin-bottom: 8px;
  cursor: ${props => props.url ? 'pointer' : 'default'};
  
  &:hover {
    text-decoration: ${props => props.url ? 'underline' : 'none'};
  }
`;

const EmbedDescription = styled.div`
  font-size: 14px;
  line-height: 1.4;
  color: var(--discord-text-normal);
  margin-bottom: 12px;
  white-space: pre-wrap;
`;

const EmbedFields = styled.div`
  display: grid;
  grid-template-columns: ${props => props.inline ? 'repeat(auto-fit, minmax(150px, 1fr))' : '1fr'};
  gap: 8px;
  margin-bottom: 12px;
`;

const EmbedField = styled.div`
  margin-bottom: 8px;
`;

const FieldName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--discord-text-normal);
  margin-bottom: 2px;
`;

const FieldValue = styled.div`
  font-size: 14px;
  color: var(--discord-text-normal);
  white-space: pre-wrap;
`;

const EmbedImage = styled.img`
  max-width: 100%;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const EmbedThumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  float: right;
  margin-left: 16px;
  margin-bottom: 8px;
`;

const EmbedFooter = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: var(--discord-text-muted);
  margin-top: 8px;
`;

const FooterIcon = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: var(--discord-blurple);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--discord-blurple-dark);
  }

  &.secondary {
    background-color: var(--discord-dark);
    border: 1px solid var(--discord-input-border);
  }

  &.secondary:hover {
    background-color: var(--discord-darker);
  }
`;

const JsonOutput = styled.pre`
  background-color: var(--discord-dark);
  border: 1px solid var(--discord-input-border);
  border-radius: 4px;
  padding: 16px;
  font-size: 12px;
  color: var(--discord-text-normal);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 300px;
  overflow-y: auto;
`;

function EmbedBuilder() {
  const [embed, setEmbed] = useState({
    title: '',
    description: '',
    color: '#5865F2',
    url: '',
    author: {
      name: '',
      icon_url: '',
      url: ''
    },
    thumbnail: {
      url: ''
    },
    image: {
      url: ''
    },
    footer: {
      text: '',
      icon_url: ''
    },
    fields: []
  });

  const [showJson, setShowJson] = useState(false);

  const updateEmbed = useCallback((path, value) => {
    setEmbed(prev => {
      const newEmbed = { ...prev };
      const keys = path.split('.');
      let current = newEmbed;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newEmbed;
    });
  }, []);

  const addField = useCallback(() => {
    setEmbed(prev => ({
      ...prev,
      fields: [...prev.fields, { name: '', value: '', inline: false }]
    }));
  }, []);

  const updateField = useCallback((index, key, value) => {
    setEmbed(prev => ({
      ...prev,
      fields: prev.fields.map((field, i) => 
        i === index ? { ...field, [key]: value } : field
      )
    }));
  }, []);

  const removeField = useCallback((index) => {
    setEmbed(prev => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index)
    }));
  }, []);

  const copyJson = useCallback(() => {
    const cleanEmbed = JSON.parse(JSON.stringify(embed));
    
    // Remove empty fields
    Object.keys(cleanEmbed).forEach(key => {
      if (typeof cleanEmbed[key] === 'object' && cleanEmbed[key] !== null) {
        Object.keys(cleanEmbed[key]).forEach(subKey => {
          if (!cleanEmbed[key][subKey]) {
            delete cleanEmbed[key][subKey];
          }
        });
        if (Object.keys(cleanEmbed[key]).length === 0) {
          delete cleanEmbed[key];
        }
      } else if (!cleanEmbed[key]) {
        delete cleanEmbed[key];
      }
    });

    navigator.clipboard.writeText(JSON.stringify(cleanEmbed, null, 2));
  }, [embed]);

  const clearEmbed = useCallback(() => {
    setEmbed({
      title: '',
      description: '',
      color: '#5865F2',
      url: '',
      author: { name: '', icon_url: '', url: '' },
      thumbnail: { url: '' },
      image: { url: '' },
      footer: { text: '', icon_url: '' },
      fields: []
    });
  }, []);

  return (
    <Container className="fade-in">
      <Grid>
        <Section>
          <SectionTitle>
            📋 Embed Builder
          </SectionTitle>
          
          <FormGroup>
            <Label>Color</Label>
            <ColorInput
              type="color"
              value={embed.color}
              onChange={(e) => updateEmbed('color', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Embed title"
              value={embed.title}
              onChange={(e) => updateEmbed('title', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Title URL (optional)</Label>
            <Input
              type="url"
              placeholder="https://example.com"
              value={embed.url}
              onChange={(e) => updateEmbed('url', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <TextArea
              placeholder="Embed description"
              value={embed.description}
              onChange={(e) => updateEmbed('description', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Author Name</Label>
            <Input
              type="text"
              placeholder="Author name"
              value={embed.author.name}
              onChange={(e) => updateEmbed('author.name', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Author Icon URL</Label>
            <Input
              type="url"
              placeholder="https://example.com/icon.png"
              value={embed.author.icon_url}
              onChange={(e) => updateEmbed('author.icon_url', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Thumbnail URL</Label>
            <Input
              type="url"
              placeholder="https://example.com/thumbnail.png"
              value={embed.thumbnail.url}
              onChange={(e) => updateEmbed('thumbnail.url', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Image URL</Label>
            <Input
              type="url"
              placeholder="https://example.com/image.png"
              value={embed.image.url}
              onChange={(e) => updateEmbed('image.url', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Footer Text</Label>
            <Input
              type="text"
              placeholder="Footer text"
              value={embed.footer.text}
              onChange={(e) => updateEmbed('footer.text', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Footer Icon URL</Label>
            <Input
              type="url"
              placeholder="https://example.com/footer-icon.png"
              value={embed.footer.icon_url}
              onChange={(e) => updateEmbed('footer.icon_url', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Fields</Label>
            {embed.fields.map((field, index) => (
              <div key={index} style={{ marginBottom: '16px', padding: '12px', backgroundColor: 'var(--discord-dark)', borderRadius: '4px' }}>
                <Input
                  type="text"
                  placeholder="Field name"
                  value={field.name}
                  onChange={(e) => updateField(index, 'name', e.target.value)}
                  style={{ marginBottom: '8px' }}
                />
                <TextArea
                  placeholder="Field value"
                  value={field.value}
                  onChange={(e) => updateField(index, 'value', e.target.value)}
                  style={{ marginBottom: '8px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--discord-text-normal)' }}>
                    <input
                      type="checkbox"
                      checked={field.inline}
                      onChange={(e) => updateField(index, 'inline', e.target.checked)}
                    />
                    Inline
                  </label>
                  <Button className="secondary" onClick={() => removeField(index)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <Button className="secondary" onClick={addField}>
              Add Field
            </Button>
          </FormGroup>

          <ButtonGroup>
            <Button onClick={() => setShowJson(!showJson)}>
              {showJson ? 'Hide JSON' : 'Show JSON'}
            </Button>
            <Button onClick={copyJson}>
              Copy JSON
            </Button>
            <Button className="secondary" onClick={clearEmbed}>
              Clear All
            </Button>
          </ButtonGroup>

          {showJson && (
            <JsonOutput>
              {JSON.stringify(embed, null, 2)}
            </JsonOutput>
          )}
        </Section>

        <PreviewSection>
          <Section>
            <SectionTitle>
              👀 Live Preview
            </SectionTitle>
            
            <EmbedPreview color={embed.color}>
              {embed.author.name && (
                <EmbedAuthor>
                  {embed.author.icon_url && (
                    <AuthorIcon src={embed.author.icon_url} alt="Author" />
                  )}
                  {embed.author.name}
                </EmbedAuthor>
              )}
              
              {embed.thumbnail.url && (
                <EmbedThumbnail src={embed.thumbnail.url} alt="Thumbnail" />
              )}
              
              {embed.title && (
                <EmbedTitle url={embed.url}>
                  {embed.title}
                </EmbedTitle>
              )}
              
              {embed.description && (
                <EmbedDescription>
                  {embed.description}
                </EmbedDescription>
              )}
              
              {embed.fields.length > 0 && (
                <EmbedFields>
                  {embed.fields.map((field, index) => (
                    <EmbedField key={index}>
                      <FieldName>{field.name}</FieldName>
                      <FieldValue>{field.value}</FieldValue>
                    </EmbedField>
                  ))}
                </EmbedFields>
              )}
              
              {embed.image.url && (
                <EmbedImage src={embed.image.url} alt="Embed" />
              )}
              
              {embed.footer.text && (
                <EmbedFooter>
                  {embed.footer.icon_url && (
                    <FooterIcon src={embed.footer.icon_url} alt="Footer" />
                  )}
                  {embed.footer.text}
                </EmbedFooter>
              )}
            </EmbedPreview>
          </Section>
        </PreviewSection>
      </Grid>
    </Container>
  );
}

export default EmbedBuilder;