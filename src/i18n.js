import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Header
      "header.title": "Discord Utility Toolkit",
      "header.subtitle": "Your all-in-one Discord companion",
      
      // Sidebar Navigation
      "nav.dashboard": "Dashboard",
      "nav.imageTools": "Image Tools",
      "nav.gifTools": "GIF Tools",
      "nav.integrationTools": "Integration Tools",
      "nav.qolTools": "QoL Tools",
      
      // Dashboard
      "dashboard.welcome": "Welcome to Discord Utility Toolkit",
      "dashboard.description": "Select a tool from the sidebar to get started with enhancing your Discord experience.",
      "dashboard.quickAccess": "Quick Access",
      "dashboard.recentlyUsed": "Recently Used Tools",
      
      // Image Tools
      "imageTools.title": "Image Tools",
      "imageTools.description": "Tools for processing and editing images",
      
      // GIF Tools
      "gifTools.title": "GIF Tools",
      "gifTools.description": "Tools for processing and editing GIFs",
      "gifTools.speedAdjuster": "Speed Adjuster",
      "gifTools.speedAdjuster.description": "Adjust the playback speed of your GIFs",
      
      // Integration Tools
      "integrationTools.title": "Integration Tools",
      "integrationTools.description": "Tools for integrating with Discord and other services",
      "integrationTools.imageOptimizer": "Image Optimizer",
      "integrationTools.imageOptimizer.description": "Optimize images for Discord uploads",
      "integrationTools.quickShare": "Quick Share",
      "integrationTools.quickShare.description": "Quickly share content to Discord",
      
      // QoL Tools
      "qolTools.title": "Quality of Life Tools",
      "qolTools.description": "Tools to improve your Discord experience",
      
      // Common UI Elements
      "common.upload": "Upload",
      "common.download": "Download",
      "common.process": "Process",
      "common.cancel": "Cancel",
      "common.save": "Save",
      "common.reset": "Reset",
      "common.loading": "Loading...",
      "common.error": "Error",
      "common.success": "Success",
      "common.ready": "Ready",
      "common.file": "File",
      "common.quality": "Quality",
      "common.size": "Size",
      "common.format": "Format",
      
      // Language Selector
      "language.selector": "Language",
      "language.english": "English",
      "language.spanish": "Español",
      "language.french": "Français",
      "language.german": "Deutsch"
    }
  },
  es: {
    translation: {
      // Header
      "header.title": "Kit de Utilidades de Discord",
      "header.subtitle": "Tu compañero todo-en-uno para Discord",
      
      // Sidebar Navigation
      "nav.dashboard": "Panel",
      "nav.imageTools": "Herramientas de Imagen",
      "nav.gifTools": "Herramientas GIF",
      "nav.integrationTools": "Herramientas de Integración",
      "nav.qolTools": "Herramientas de Calidad",
      
      // Dashboard
      "dashboard.welcome": "Bienvenido al Kit de Utilidades de Discord",
      "dashboard.description": "Selecciona una herramienta de la barra lateral para comenzar a mejorar tu experiencia en Discord.",
      "dashboard.quickAccess": "Acceso Rápido",
      "dashboard.recentlyUsed": "Herramientas Usadas Recientemente",
      
      // Image Tools
      "imageTools.title": "Herramientas de Imagen",
      "imageTools.description": "Herramientas para procesar y editar imágenes",
      
      // GIF Tools
      "gifTools.title": "Herramientas GIF",
      "gifTools.description": "Herramientas para procesar y editar GIFs",
      "gifTools.speedAdjuster": "Ajustador de Velocidad",
      "gifTools.speedAdjuster.description": "Ajusta la velocidad de reproducción de tus GIFs",
      
      // Integration Tools
      "integrationTools.title": "Herramientas de Integración",
      "integrationTools.description": "Herramientas para integrar con Discord y otros servicios",
      "integrationTools.imageOptimizer": "Optimizador de Imágenes",
      "integrationTools.imageOptimizer.description": "Optimiza imágenes para subir a Discord",
      "integrationTools.quickShare": "Compartir Rápido",
      "integrationTools.quickShare.description": "Comparte contenido rápidamente en Discord",
      
      // QoL Tools
      "qolTools.title": "Herramientas de Calidad de Vida",
      "qolTools.description": "Herramientas para mejorar tu experiencia en Discord",
      
      // Common UI Elements
      "common.upload": "Subir",
      "common.download": "Descargar",
      "common.process": "Procesar",
      "common.cancel": "Cancelar",
      "common.save": "Guardar",
      "common.reset": "Reiniciar",
      "common.loading": "Cargando...",
      "common.error": "Error",
      "common.success": "Éxito",
      "common.ready": "Listo",
      "common.file": "Archivo",
      "common.quality": "Calidad",
      "common.size": "Tamaño",
      "common.format": "Formato",
      
      // Language Selector
      "language.selector": "Idioma",
      "language.english": "English",
      "language.spanish": "Español",
      "language.french": "Français",
      "language.german": "Deutsch"
    }
  },
  fr: {
    translation: {
      // Header
      "header.title": "Boîte à Outils Discord",
      "header.subtitle": "Votre compagnon tout-en-un pour Discord",
      
      // Sidebar Navigation
      "nav.dashboard": "Tableau de Bord",
      "nav.imageTools": "Outils d'Image",
      "nav.gifTools": "Outils GIF",
      "nav.integrationTools": "Outils d'Intégration",
      "nav.qolTools": "Outils de Qualité",
      
      // Dashboard
      "dashboard.welcome": "Bienvenue dans la Boîte à Outils Discord",
      "dashboard.description": "Sélectionnez un outil dans la barre latérale pour commencer à améliorer votre expérience Discord.",
      "dashboard.quickAccess": "Accès Rapide",
      "dashboard.recentlyUsed": "Outils Récemment Utilisés",
      
      // Image Tools
      "imageTools.title": "Outils d'Image",
      "imageTools.description": "Outils pour traiter et éditer les images",
      
      // GIF Tools
      "gifTools.title": "Outils GIF",
      "gifTools.description": "Outils pour traiter et éditer les GIFs",
      "gifTools.speedAdjuster": "Ajusteur de Vitesse",
      "gifTools.speedAdjuster.description": "Ajustez la vitesse de lecture de vos GIFs",
      
      // Integration Tools
      "integrationTools.title": "Outils d'Intégration",
      "integrationTools.description": "Outils pour intégrer avec Discord et autres services",
      "integrationTools.imageOptimizer": "Optimiseur d'Images",
      "integrationTools.imageOptimizer.description": "Optimisez les images pour les téléchargements Discord",
      "integrationTools.quickShare": "Partage Rapide",
      "integrationTools.quickShare.description": "Partagez rapidement du contenu sur Discord",
      
      // QoL Tools
      "qolTools.title": "Outils de Qualité de Vie",
      "qolTools.description": "Outils pour améliorer votre expérience Discord",
      
      // Common UI Elements
      "common.upload": "Télécharger",
      "common.download": "Télécharger",
      "common.process": "Traiter",
      "common.cancel": "Annuler",
      "common.save": "Sauvegarder",
      "common.reset": "Réinitialiser",
      "common.loading": "Chargement...",
      "common.error": "Erreur",
      "common.success": "Succès",
      "common.ready": "Prêt",
      "common.file": "Fichier",
      "common.quality": "Qualité",
      "common.size": "Taille",
      "common.format": "Format",
      
      // Language Selector
      "language.selector": "Langue",
      "language.english": "English",
      "language.spanish": "Español",
      "language.french": "Français",
      "language.german": "Deutsch"
    }
  },
  de: {
    translation: {
      // Header
      "header.title": "Discord Utility Toolkit",
      "header.subtitle": "Ihr All-in-One Discord Begleiter",
      
      // Sidebar Navigation
      "nav.dashboard": "Dashboard",
      "nav.imageTools": "Bild-Tools",
      "nav.gifTools": "GIF-Tools",
      "nav.integrationTools": "Integrations-Tools",
      "nav.qolTools": "QoL-Tools",
      
      // Dashboard
      "dashboard.welcome": "Willkommen beim Discord Utility Toolkit",
      "dashboard.description": "Wählen Sie ein Tool aus der Seitenleiste, um Ihre Discord-Erfahrung zu verbessern.",
      "dashboard.quickAccess": "Schnellzugriff",
      "dashboard.recentlyUsed": "Kürzlich Verwendete Tools",
      
      // Image Tools
      "imageTools.title": "Bild-Tools",
      "imageTools.description": "Tools zum Verarbeiten und Bearbeiten von Bildern",
      
      // GIF Tools
      "gifTools.title": "GIF-Tools",
      "gifTools.description": "Tools zum Verarbeiten und Bearbeiten von GIFs",
      "gifTools.speedAdjuster": "Geschwindigkeits-Anpasser",
      "gifTools.speedAdjuster.description": "Passen Sie die Wiedergabegeschwindigkeit Ihrer GIFs an",
      
      // Integration Tools
      "integrationTools.title": "Integrations-Tools",
      "integrationTools.description": "Tools zur Integration mit Discord und anderen Diensten",
      "integrationTools.imageOptimizer": "Bild-Optimierer",
      "integrationTools.imageOptimizer.description": "Optimieren Sie Bilder für Discord-Uploads",
      "integrationTools.quickShare": "Schnell Teilen",
      "integrationTools.quickShare.description": "Teilen Sie Inhalte schnell auf Discord",
      
      // QoL Tools
      "qolTools.title": "Lebensqualitäts-Tools",
      "qolTools.description": "Tools zur Verbesserung Ihrer Discord-Erfahrung",
      
      // Common UI Elements
      "common.upload": "Hochladen",
      "common.download": "Herunterladen",
      "common.process": "Verarbeiten",
      "common.cancel": "Abbrechen",
      "common.save": "Speichern",
      "common.reset": "Zurücksetzen",
      "common.loading": "Laden...",
      "common.error": "Fehler",
      "common.success": "Erfolg",
      "common.ready": "Bereit",
      "common.file": "Datei",
      "common.quality": "Qualität",
      "common.size": "Größe",
      "common.format": "Format",
      
      // Language Selector
      "language.selector": "Sprache",
      "language.english": "English",
      "language.spanish": "Español",
      "language.french": "Français",
      "language.german": "Deutsch"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n;