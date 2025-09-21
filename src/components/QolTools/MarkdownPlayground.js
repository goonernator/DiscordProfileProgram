import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  height: calc(100vh - 200px);
  min-height: 600px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const Section = styled.div`
  background-color: var(--discord-darker);
  border: 1px solid var(--discord-dark);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const SectionHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--discord-dark);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--discord-header-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 20px;
  background-color: var(--discord-dark);
  border: none;
  color: var(--discord-text-normal);
  font-size: 14px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  line-height: 1.5;
  resize: none;
  outline: none;

  &::placeholder {
    color: var(--discord-text-muted);
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--discord-darker);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--discord-scrollbar-thumb);
    border-radius: 4px;
  }
`;

const PreviewArea = styled.div`
  flex: 1;
  padding: 20px;
  background-color: var(--discord-dark);
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.6;
  color: var(--discord-text-normal);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--discord-darker);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--discord-scrollbar-thumb);
    border-radius: 4px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 6px 12px;
  background-color: var(--discord-blurple);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
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

const ToolbarSection = styled.div`
  background-color: var(--discord-darker);
  border: 1px solid var(--discord-dark);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`;

const ToolbarTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: var(--discord-header-primary);
  margin: 0 0 12px 0;
`;

const QuickButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
  margin-bottom: 16px;
`;

const QuickButton = styled.button`
  padding: 8px 12px;
  background-color: var(--discord-dark);
  border: 1px solid var(--discord-input-border);
  border-radius: 4px;
  color: var(--discord-text-normal);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--discord-darker);
    border-color: var(--discord-blurple);
  }
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
`;

const TemplateCard = styled.div`
  background-color: var(--discord-dark);
  border: 1px solid var(--discord-input-border);
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--discord-blurple);
    background-color: var(--discord-darker);
  }
`;

const TemplateName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--discord-text-normal);
  margin-bottom: 4px;
`;

const TemplateDescription = styled.div`
  font-size: 12px;
  color: var(--discord-text-muted);
`;

function MarkdownPlayground() {
  const [markdown, setMarkdown] = useState(`# Discord Markdown Guide

## Text Formatting
**Bold text** and *italic text*
~~Strikethrough text~~
\`Inline code\`

## Code Blocks
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

## Lists
- Bullet point 1
- Bullet point 2
  - Nested item
  - Another nested item

1. Numbered list
2. Second item
3. Third item

## Links and Mentions
[Discord](https://discord.com)
<@123456789> - User mention
<#123456789> - Channel mention
<@&123456789> - Role mention

## Quotes
> This is a quote
> Multiple lines work too

## Spoilers
||Hidden spoiler text||

## Emojis
:smile: :heart: :thumbsup:

## Headers
# Header 1
## Header 2
### Header 3`);

  const templates = [
    {
      name: 'Server Rules',
      description: 'Template for server rules',
      content: `# 📋 Server Rules

## General Rules
1. **Be respectful** - Treat all members with kindness
2. **No spam** - Keep messages relevant and meaningful
3. **Use appropriate channels** - Check channel descriptions
4. **No NSFW content** - Keep it family-friendly

## Voice Chat Rules
- **Push to talk preferred** - Reduces background noise
- **No music bots in general** - Use designated music channels
- **Respect others** - Don't interrupt conversations

## Consequences
⚠️ **Warning** → 🔇 **Mute** → 🚫 **Kick** → ⛔ **Ban**

Questions? Contact <@&123456789> (Moderators)`
    },
    {
      name: 'Event Announcement',
      description: 'Template for events',
      content: `# 🎉 Community Event

## 🎮 Game Night
**When:** Saturday, 8 PM EST
**Where:** <#123456789>
**What:** Among Us Tournament

### How to Join
1. React with 🎮 to this message
2. Join the voice channel at event time
3. Have fun!

### Prizes
🥇 **1st Place:** Discord Nitro (1 month)
🥈 **2nd Place:** Custom role color
🥉 **3rd Place:** Server boost recognition

*Event hosted by <@123456789>*`
    },
    {
      name: 'Bot Commands',
      description: 'Documentation for bot commands',
      content: `# 🤖 Bot Commands

## Music Commands
\`!play <song>\` - Play a song
\`!skip\` - Skip current song
\`!queue\` - Show music queue
\`!volume <1-100>\` - Adjust volume

## Moderation Commands
\`!kick <user>\` - Kick a user
\`!ban <user>\` - Ban a user
\`!mute <user>\` - Mute a user
\`!warn <user>\` - Warn a user

## Fun Commands
\`!meme\` - Random meme
\`!joke\` - Random joke
\`!8ball <question>\` - Magic 8-ball
\`!roll <dice>\` - Roll dice

> **Note:** Some commands require specific permissions`
    },
    {
      name: 'Welcome Message',
      description: 'New member welcome',
      content: `# 👋 Welcome to Our Server!

Hey <@123456789>, welcome to **Server Name**! 

## Getting Started
1. Read our rules in <#123456789>
2. Introduce yourself in <#123456789>
3. Pick your roles in <#123456789>
4. Join the conversation in <#123456789>

## Server Features
🎮 **Gaming** - Find teammates and play together
💬 **Chat** - General discussion and memes
🎵 **Music** - Listen to music with friends
📚 **Study** - Study groups and help

## Need Help?
Contact our <@&123456789> team anytime!

*Enjoy your stay!* ✨`
    }
  ];

  const quickInserts = [
    { label: 'Bold', syntax: '**text**' },
    { label: 'Italic', syntax: '*text*' },
    { label: 'Code', syntax: '`code`' },
    { label: 'Strikethrough', syntax: '~~text~~' },
    { label: 'Spoiler', syntax: '||spoiler||' },
    { label: 'Quote', syntax: '> quote' },
    { label: 'Code Block', syntax: '```\ncode\n```' },
    { label: 'Link', syntax: '[text](url)' },
    { label: 'User Mention', syntax: '<@123456789>' },
    { label: 'Channel', syntax: '<#123456789>' },
    { label: 'Role', syntax: '<@&123456789>' },
    { label: 'Header 1', syntax: '# Header' },
    { label: 'Header 2', syntax: '## Header' },
    { label: 'Header 3', syntax: '### Header' },
    { label: 'List Item', syntax: '- Item' },
    { label: 'Numbered', syntax: '1. Item' }
  ];

  const insertSyntax = useCallback((syntax) => {
    const textarea = document.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = markdown;
    const before = text.substring(0, start);
    const after = text.substring(end);
    
    setMarkdown(before + syntax + after);
    
    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + syntax.length, start + syntax.length);
    }, 0);
  }, [markdown]);

  const applyTemplate = useCallback((template) => {
    setMarkdown(template.content);
  }, []);

  const copyMarkdown = useCallback(() => {
    navigator.clipboard.writeText(markdown);
  }, [markdown]);

  const clearEditor = useCallback(() => {
    setMarkdown('');
  }, []);

  const renderMarkdown = useMemo(() => {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold and Italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Strikethrough
    html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');

    // Spoilers
    html = html.replace(/\|\|(.*?)\|\|/g, '<span style="background: #202225; color: #202225; border-radius: 3px; padding: 0 2px;" title="Click to reveal spoiler">$1</span>');

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre style="background: #2f3136; padding: 12px; border-radius: 4px; border-left: 4px solid #5865f2; overflow-x: auto;"><code>$2</code></pre>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code style="background: #2f3136; padding: 2px 4px; border-radius: 3px; font-family: Consolas, Monaco, monospace;">$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #00aff4; text-decoration: none;" target="_blank">$1</a>');

    // Discord mentions
    html = html.replace(/<@(\d+)>/g, '<span style="background: #5865f2; color: white; padding: 0 2px; border-radius: 3px;">@user</span>');
    html = html.replace(/<#(\d+)>/g, '<span style="background: #5865f2; color: white; padding: 0 2px; border-radius: 3px;">#channel</span>');
    html = html.replace(/<@&(\d+)>/g, '<span style="background: #5865f2; color: white; padding: 0 2px; border-radius: 3px;">@role</span>');

    // Quotes
    html = html.replace(/^> (.*)$/gm, '<blockquote style="border-left: 4px solid #4f545c; margin: 4px 0; padding-left: 16px; color: #dcddde;">$1</blockquote>');

    // Lists
    html = html.replace(/^\d+\. (.*)$/gm, '<li style="margin-left: 20px;">$1</li>');
    html = html.replace(/^- (.*)$/gm, '<li style="margin-left: 20px; list-style-type: disc;">$1</li>');

    // Line breaks
    html = html.replace(/\n/g, '<br>');

    return html;
  }, [markdown]);

  return (
    <Container className="fade-in">
      <ToolbarSection>
        <ToolbarTitle>📝 Quick Insert</ToolbarTitle>
        <QuickButtons>
          {quickInserts.map((item, index) => (
            <QuickButton key={index} onClick={() => insertSyntax(item.syntax)}>
              {item.label}
            </QuickButton>
          ))}
        </QuickButtons>
        
        <ToolbarTitle>📋 Templates</ToolbarTitle>
        <TemplateGrid>
          {templates.map((template, index) => (
            <TemplateCard key={index} onClick={() => applyTemplate(template)}>
              <TemplateName>{template.name}</TemplateName>
              <TemplateDescription>{template.description}</TemplateDescription>
            </TemplateCard>
          ))}
        </TemplateGrid>
      </ToolbarSection>

      <Grid>
        <Section>
          <SectionHeader>
            <SectionTitle>
              ✏️ Markdown Editor
            </SectionTitle>
            <ButtonGroup>
              <Button onClick={copyMarkdown}>
                Copy
              </Button>
              <Button className="secondary" onClick={clearEditor}>
                Clear
              </Button>
            </ButtonGroup>
          </SectionHeader>
          <TextArea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here..."
          />
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>
              👀 Live Preview
            </SectionTitle>
          </SectionHeader>
          <PreviewArea
            dangerouslySetInnerHTML={{ __html: renderMarkdown }}
          />
        </Section>
      </Grid>
    </Container>
  );
}

export default MarkdownPlayground;