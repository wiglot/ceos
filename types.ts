export interface Emotion {
  id: string; // e.g., 'alegria_extasia'
  name: string; // e.g., 'Êxtase'
  baseEmotion: string; // e.g., 'Alegria'
  intensityLevel: 1 | 2 | 3; // 3 = most intense (inner), 2 = mid, 1 = least intense (outer)
  color: string; // hex color
  definition?: string; // Optional: A rich text description of the emotion
}

export interface SelectedEmotion {
  emotionId: string; // Corresponds to Emotion.id
  name: string;
  intensity: number; // 0-100 (User-defined intensity, distinct from Plutchik's levels)
}

export interface ThoughtRecord {
  id: string; // Unique ID for the thought instance
  text: string;
  conviction: number; // 0-100
}

export interface AlternativeResponseRecord {
  id: string; // Unique ID for the response instance
  text: string;
  belief: number; // 0-100
}

export interface Reassessment {
  reEvaluatedThoughts: ThoughtRecord[]; // Same thoughts as automaticThoughts, new conviction
  currentEmotions: SelectedEmotion[];
  actionPlan: string;
}

export interface DysfunctionalThoughtEntry {
  id: string; // Unique identifier for the entry
  date: string; // ISO date string
  situation: string;
  initialEmotions: SelectedEmotion[];
  automaticThoughts: ThoughtRecord[];
  alternativeResponses: AlternativeResponseRecord[];
  reassessment: Reassessment;
}