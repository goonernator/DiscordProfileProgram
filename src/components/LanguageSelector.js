import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const LanguageContainer = styled.div`
  position: relative;
  display: inline-block;
  animation: fadeInLeft 0.5s ease-out 0.5s both;
  
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const LanguageSelect = styled.select`
  background-color: var(--discord-light);
  color: var(--discord-text-normal);
  border: 1px solid var(--discord-dark);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &:hover {
    background-color: var(--discord-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:focus {
    border-color: var(--discord-blurple);
    box-shadow: 0 0 0 2px rgba(88, 101, 242, 0.2);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  option {
    background-color: var(--discord-light);
    color: var(--discord-text-normal);
    padding: 8px 12px;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: var(--discord-blurple);
      color: white;
    }
  }
`;

const LanguageIcon = styled.span`
  margin-right: 8px;
  font-size: 16px;
`;

function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const languages = [
    { code: 'en', name: t('language.english'), flag: '🇺🇸' },
    { code: 'es', name: t('language.spanish'), flag: '🇪🇸' },
    { code: 'fr', name: t('language.french'), flag: '🇫🇷' },
    { code: 'de', name: t('language.german'), flag: '🇩🇪' }
  ];

  return (
    <LanguageContainer>
      <LanguageSelect 
        value={i18n.language} 
        onChange={handleLanguageChange}
        title={t('language.selector')}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </LanguageSelect>
    </LanguageContainer>
  );
}

export default LanguageSelector;