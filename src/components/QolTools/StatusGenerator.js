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

const Select = styled.select`
  width: 100%;
  padding: 12px;
  background-color: var(--discord-dark);
  border: 1px solid var(--discord-input-border);
  border-radius: 4px;
  color: var(--discord-text-normal);
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--discord-blurple);
  }

  option {
    background-color: var(--discord-dark);
    color: var(--discord-text-normal);
  }
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

const StatusPreview = styled.div`
  background-color: var(--discord-dark);
  border: 1px solid var(--discord-input-border);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const Avatar = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(45deg, #5865F2, #7289DA);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const StatusIndicator = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 3px solid var(--discord-dark);
  background-color: ${props => {
    switch (props.status) {
      case 'online': return '#23a55a';
      case 'idle': return '#f0b232';
      case 'dnd': return '#f23f43';
      case 'invisible': return '#80848e';
      default: return '#80848e';
    }
  }};
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--discord-text-normal);
  margin-bottom: 2px;
`;

const StatusText = styled.div`
  font-size: 14px;
  color: var(--discord-text-muted);
`;

const ActivityCard = styled.div`
  background-color: var(--discord-darker);
  border: 1px solid var(--discord-dark);
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 12px;
`;

const ActivityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--discord-text-muted);
  text-transform: uppercase;
`;

const ActivityIcon = styled.span`
  font-size: 14px;
`;

const ActivityName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--discord-text-normal);
  margin-bottom: 4px;
`;

const ActivityDetails = styled.div`
  font-size: 12px;
  color: var(--discord-text-muted);
  line-height: 1.3;
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

const PresetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
`;

const PresetCard = styled.div`
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

const PresetName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--discord-text-normal);
  margin-bottom: 4px;
`;

const PresetDescription = styled.div`
  font-size: 12px;
  color: var(--discord-text-muted);
`;

function StatusGenerator() {
  const [status, setStatus] = useState({
    presence: 'online',
    customStatus: '',
    activity: {
      type: 'playing',
      name: '',
      details: '',
      state: '',
      url: ''
    }
  });

  const [showJson, setShowJson] = useState(false);

  const activityTypes = [
    { value: 'playing', label: 'Playing', icon: '🎮' },
    { value: 'streaming', label: 'Streaming', icon: '📺' },
    { value: 'listening', label: 'Listening to', icon: '🎵' },
    { value: 'watching', label: 'Watching', icon: '👀' },
    { value: 'competing', label: 'Competing in', icon: '🏆' }
  ];

  const presets = [
    {
      name: 'Gaming Session',
      description: 'Perfect for when you\'re gaming',
      data: {
        presence: 'dnd',
        customStatus: '🎮 In a ranked match',
        activity: {
          type: 'playing',
          name: 'League of Legends',
          details: 'Ranked Solo/Duo',
          state: 'In Game (15:32)',
          url: ''
        }
      }
    },
    {
      name: 'Streaming',
      description: 'Live streaming setup',
      data: {
        presence: 'online',
        customStatus: '🔴 Live on Twitch!',
        activity: {
          type: 'streaming',
          name: 'Just Chatting',
          details: 'Building Discord bots',
          state: 'twitch.tv/username',
          url: 'https://twitch.tv/username'
        }
      }
    },
    {
      name: 'Music Vibes',
      description: 'Listening to music',
      data: {
        presence: 'idle',
        customStatus: '🎵 Vibing to music',
        activity: {
          type: 'listening',
          name: 'Spotify',
          details: 'The Weeknd',
          state: 'Blinding Lights',
          url: ''
        }
      }
    },
    {
      name: 'Movie Night',
      description: 'Watching movies or shows',
      data: {
        presence: 'dnd',
        customStatus: '🍿 Movie night',
        activity: {
          type: 'watching',
          name: 'Netflix',
          details: 'Stranger Things',
          state: 'Season 4, Episode 1',
          url: ''
        }
      }
    }
  ];

  const updateStatus = useCallback((field, value) => {
    setStatus(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const updateActivity = useCallback((field, value) => {
    setStatus(prev => ({
      ...prev,
      activity: {
        ...prev.activity,
        [field]: value
      }
    }));
  }, []);

  const applyPreset = useCallback((preset) => {
    setStatus(preset.data);
  }, []);

  const copyJson = useCallback(() => {
    const statusData = {
      status: status.presence,
      custom_status: status.customStatus || null,
      activities: status.activity.name ? [{
        type: activityTypes.find(t => t.value === status.activity.type)?.value || 0,
        name: status.activity.name,
        details: status.activity.details || null,
        state: status.activity.state || null,
        url: status.activity.url || null
      }] : []
    };

    navigator.clipboard.writeText(JSON.stringify(statusData, null, 2));
  }, [status, activityTypes]);

  const clearStatus = useCallback(() => {
    setStatus({
      presence: 'online',
      customStatus: '',
      activity: {
        type: 'playing',
        name: '',
        details: '',
        state: '',
        url: ''
      }
    });
  }, []);

  const getActivityTypeLabel = (type) => {
    return activityTypes.find(t => t.value === type)?.label || 'Playing';
  };

  const getActivityTypeIcon = (type) => {
    return activityTypes.find(t => t.value === type)?.icon || '🎮';
  };

  return (
    <Container className="fade-in">
      <Grid>
        <Section>
          <SectionTitle>
            ⚡ Status Generator
          </SectionTitle>

          <FormGroup>
            <Label>Quick Presets</Label>
            <PresetGrid>
              {presets.map((preset, index) => (
                <PresetCard key={index} onClick={() => applyPreset(preset)}>
                  <PresetName>{preset.name}</PresetName>
                  <PresetDescription>{preset.description}</PresetDescription>
                </PresetCard>
              ))}
            </PresetGrid>
          </FormGroup>

          <FormGroup>
            <Label>Presence Status</Label>
            <Select
              value={status.presence}
              onChange={(e) => updateStatus('presence', e.target.value)}
            >
              <option value="online">🟢 Online</option>
              <option value="idle">🟡 Idle</option>
              <option value="dnd">🔴 Do Not Disturb</option>
              <option value="invisible">⚫ Invisible</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Custom Status</Label>
            <Input
              type="text"
              placeholder="😎 Feeling awesome!"
              value={status.customStatus}
              onChange={(e) => updateStatus('customStatus', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Activity Type</Label>
            <Select
              value={status.activity.type}
              onChange={(e) => updateActivity('type', e.target.value)}
            >
              {activityTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Activity Name</Label>
            <Input
              type="text"
              placeholder="Visual Studio Code"
              value={status.activity.name}
              onChange={(e) => updateActivity('name', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Details (optional)</Label>
            <Input
              type="text"
              placeholder="Editing main.js"
              value={status.activity.details}
              onChange={(e) => updateActivity('details', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>State (optional)</Label>
            <Input
              type="text"
              placeholder="Working on Discord bot"
              value={status.activity.state}
              onChange={(e) => updateActivity('state', e.target.value)}
            />
          </FormGroup>

          {status.activity.type === 'streaming' && (
            <FormGroup>
              <Label>Stream URL</Label>
              <Input
                type="url"
                placeholder="https://twitch.tv/username"
                value={status.activity.url}
                onChange={(e) => updateActivity('url', e.target.value)}
              />
            </FormGroup>
          )}

          <ButtonGroup>
            <Button onClick={() => setShowJson(!showJson)}>
              {showJson ? 'Hide JSON' : 'Show JSON'}
            </Button>
            <Button onClick={copyJson}>
              Copy JSON
            </Button>
            <Button className="secondary" onClick={clearStatus}>
              Clear All
            </Button>
          </ButtonGroup>

          {showJson && (
            <JsonOutput>
              {JSON.stringify({
                status: status.presence,
                custom_status: status.customStatus || null,
                activities: status.activity.name ? [{
                  type: activityTypes.find(t => t.value === status.activity.type)?.value || 0,
                  name: status.activity.name,
                  details: status.activity.details || null,
                  state: status.activity.state || null,
                  url: status.activity.url || null
                }] : []
              }, null, 2)}
            </JsonOutput>
          )}
        </Section>

        <Section>
          <SectionTitle>
            👀 Live Preview
          </SectionTitle>
          
          <StatusPreview>
            <UserCard>
              <Avatar>
                U
                <StatusIndicator status={status.presence} />
              </Avatar>
              <UserInfo>
                <Username>Your Username</Username>
                <StatusText>
                  {status.presence === 'online' && 'Online'}
                  {status.presence === 'idle' && 'Away'}
                  {status.presence === 'dnd' && 'Do Not Disturb'}
                  {status.presence === 'invisible' && 'Offline'}
                </StatusText>
              </UserInfo>
            </UserCard>

            {status.customStatus && (
              <ActivityCard>
                <ActivityName>{status.customStatus}</ActivityName>
              </ActivityCard>
            )}

            {status.activity.name && (
              <ActivityCard>
                <ActivityHeader>
                  <ActivityIcon>{getActivityTypeIcon(status.activity.type)}</ActivityIcon>
                  {getActivityTypeLabel(status.activity.type)}
                </ActivityHeader>
                <ActivityName>{status.activity.name}</ActivityName>
                <ActivityDetails>
                  {status.activity.details && <div>{status.activity.details}</div>}
                  {status.activity.state && <div>{status.activity.state}</div>}
                </ActivityDetails>
              </ActivityCard>
            )}
          </StatusPreview>
        </Section>
      </Grid>
    </Container>
  );
}

export default StatusGenerator;