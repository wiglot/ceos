import { Emotion } from './types';

export const PLUTCHIK_EMOTIONS_DEFINITIONS: Emotion[] = [
  // Alegria (Yellow)
  { id: 'alegria_serenidade', name: 'Serenidade', baseEmotion: 'Alegria', intensityLevel: 1, color: '#FFFFBF' },
  { id: 'alegria_alegria', name: 'Alegria', baseEmotion: 'Alegria', intensityLevel: 2, color: '#FFFF7F' },
  { id: 'alegria_extasia', name: 'Extasia', baseEmotion: 'Alegria', intensityLevel: 3, color: '#FFFF00' },

  // Confiança (Light Green)
  { id: 'confianca_aprovacao', name: 'Aprovação', baseEmotion: 'Confiança', intensityLevel: 1, color: '#BFFFBF' },
  { id: 'confianca_confianca', name: 'Confiança', baseEmotion: 'Confiança', intensityLevel: 2, color: '#7FFF7F' },
  { id: 'confianca_admiracao', name: 'Admiração', baseEmotion: 'Confiança', intensityLevel: 3, color: '#00FF00' },

  // Medo (Dark Green)
  { id: 'medo_apreensao', name: 'Apreensão', baseEmotion: 'Medo', intensityLevel: 1, color: '#99CC99' }, // Lighter shade of dark green
  { id: 'medo_medo', name: 'Medo', baseEmotion: 'Medo', intensityLevel: 2, color: '#008000' }, // Dark green
  { id: 'medo_terror', name: 'Terror', baseEmotion: 'Medo', intensityLevel: 3, color: '#006600' }, // Very dark green

  // Surpresa (Cyan)
  { id: 'surpresa_distracao', name: 'Distração', baseEmotion: 'Surpresa', intensityLevel: 1, color: '#BFFFFF' },
  { id: 'surpresa_surpresa', name: 'Surpresa', baseEmotion: 'Surpresa', intensityLevel: 2, color: '#7FFFFF' },
  { id: 'surpresa_assombro', name: 'Assombro', baseEmotion: 'Surpresa', intensityLevel: 3, color: '#00DDDD' },

  // Tristeza (Blue)
  { id: 'tristeza_abatimento', name: 'Abatimento', baseEmotion: 'Tristeza', intensityLevel: 1, color: '#BFBFFF' },
  { id: 'tristeza_tristeza', name: 'Tristeza', baseEmotion: 'Tristeza', intensityLevel: 2, color: '#7F7FFF' },
  { id: 'tristeza_angustia', name: 'Angústia', baseEmotion: 'Tristeza', intensityLevel: 3, color: '#0000CC' },

  // Nojo (Magenta/Pink)
  { id: 'nojo_tedio', name: 'Tédio', baseEmotion: 'Nojo', intensityLevel: 1, color: '#FFCCFF' },
  { id: 'nojo_nojo', name: 'Nojo', baseEmotion: 'Nojo', intensityLevel: 2, color: '#FF99FF' },
  { id: 'nojo_repugnancia', name: 'Repugnância', baseEmotion: 'Nojo', intensityLevel: 3, color: '#FF00FF' },

  // Raiva (Red)
  { id: 'raiva_aborrecimento', name: 'Aborrecimento', baseEmotion: 'Raiva', intensityLevel: 1, color: '#FFBFBF' },
  { id: 'raiva_irritacao', name: 'Irritação', baseEmotion: 'Raiva', intensityLevel: 2, color: '#FF7F7F' },
  { id: 'raiva_ira', name: 'Ira', baseEmotion: 'Raiva', intensityLevel: 3, color: '#DD0000' },

  // Antecipação (Orange)
  { id: 'antecipacao_interesse', name: 'Interesse', baseEmotion: 'Antecipação', intensityLevel: 1, color: '#FFDFBF' },
  { id: 'antecipacao_antecipacao', name: 'Antecipação', baseEmotion: 'Antecipação', intensityLevel: 2, color: '#FFC27F' },
  { id: 'antecipacao_vigilancia', name: 'Vigilância', baseEmotion: 'Antecipação', intensityLevel: 3, color: '#FF6600' },
];

// Order of petals, clockwise starting from top
export const PLUTCHIK_BASE_EMOTIONS_ORDER = [
  'Alegria', 'Confiança', 'Medo', 'Surpresa', 'Tristeza', 'Nojo', 'Raiva', 'Antecipação'
];

// Radii for the different intensity levels of Plutchik's wheel
export const PLUTCHIK_RADII = {
  intensity1: 150, // Outermost (e.g., Serenidade)
  intensity2: 100, // Middle (e.g., Alegria)
  intensity3: 50,  // Innermost (e.g., Êxtase)
  centerCircle: 25 // Radius for the central text display circle
};

export const SVG_VIEWBOX_SIZE = PLUTCHIK_RADII.intensity1 * 2 + 20; // +20 for padding/stroke
export const SVG_CENTER = SVG_VIEWBOX_SIZE / 2;
