import React, { useState, useMemo } from 'react';
import { SelectedEmotion, Emotion } from '../types';
import { PLUTCHIK_EMOTIONS_DEFINITIONS, PLUTCHIK_BASE_EMOTIONS_ORDER, PLUTCHIK_RADII, SVG_VIEWBOX_SIZE, SVG_CENTER } from '../constants';

interface EmotionSelectorProps {
  idPrefix: string;
  selectedEmotions: SelectedEmotion[];
  onChange: (emotions: SelectedEmotion[]) => void;
  label?: string;
}

const SLICE_STROKE_COLOR = '#666'; // Darker stroke for better definition
const HOVER_STROKE_COLOR = 'black';
const STROKE_WIDTH = 1;
const HOVER_STROKE_WIDTH = 2.5;
const TEXT_COLOR = '#2D3748'; // gray-800
const TEXT_FONT_SIZE = "8px";

const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180);

// Calculates coordinates for a point on a circle, 0 degrees is top
const getCoordinates = (angleDegrees: number, radius: number, centerX: number, centerY: number) => {
  const angleRadians = degreesToRadians(angleDegrees - 90);
  return [
    centerX + radius * Math.cos(angleRadians),
    centerY + radius * Math.sin(angleRadians)
  ];
};

// Generates SVG path data for an arc segment (like a slice of a doughnut)
const getArcPathData = (
  innerRadius: number,
  outerRadius: number,
  startAngleDegrees: number,
  endAngleDegrees: number,
  centerX: number,
  centerY: number
): string => {
  const [outerStartX, outerStartY] = getCoordinates(startAngleDegrees, outerRadius, centerX, centerY);
  const [outerEndX, outerEndY] = getCoordinates(endAngleDegrees, outerRadius, centerX, centerY);
  const [innerEndX, innerEndY] = getCoordinates(endAngleDegrees, innerRadius, centerX, centerY);
  const [innerStartX, innerStartY] = getCoordinates(startAngleDegrees, innerRadius, centerX, centerY);

  const largeArcFlag = (endAngleDegrees - startAngleDegrees) <= 180 ? 0 : 1;

  return [
    `M ${outerStartX} ${outerStartY}`, // Move to outer start
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`, // Arc to outer end
    `L ${innerEndX} ${innerEndY}`, // Line to inner end
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`, // Arc to inner start (reverse sweep)
    'Z' // Close path
  ].join(' ');
};


const EmotionSelector: React.FC<EmotionSelectorProps> = ({ idPrefix, selectedEmotions, onChange, label }) => {
  const [hoveredEmotion, setHoveredEmotion] = useState<Emotion | null>(null);

  const handleAddEmotion = (emotion: Emotion) => {
    if (!selectedEmotions.find(e => e.emotionId === emotion.id)) {
      onChange([...selectedEmotions, { emotionId: emotion.id, name: emotion.name, intensity: 50 }]);
    }
  };

  const handleRemoveEmotion = (emotionIdToRemove: string) => {
    onChange(selectedEmotions.filter(e => e.emotionId !== emotionIdToRemove));
  };

  const handleIntensityChange = (emotionIdToUpdate: string, newIntensity: number) => {
    onChange(selectedEmotions.map(e => e.emotionId === emotionIdToUpdate ? { ...e, intensity: newIntensity } : e));
  };

  const wheelSegments = useMemo(() => {
    const segments: Array<Emotion & { pathData: string; textPosition: { x: number; y: number; rotation: number } }> = [];
    const numBaseEmotions = PLUTCHIK_BASE_EMOTIONS_ORDER.length;
    const anglePerPetal = 360 / numBaseEmotions;

    PLUTCHIK_BASE_EMOTIONS_ORDER.forEach((baseEmotionName, index) => {
      const petalStartAngle = index * anglePerPetal;
      const petalEndAngle = (index + 1) * anglePerPetal;

      const emotionsInPetal = PLUTCHIK_EMOTIONS_DEFINITIONS.filter(e => e.baseEmotion === baseEmotionName).sort((a,b) => a.intensityLevel - b.intensityLevel); // Sort by intensity: 1 (outer) to 3 (inner)

      emotionsInPetal.forEach(emotion => {
        let innerR: number, outerR: number;
        switch (emotion.intensityLevel) {
          case 1: // Outermost
            innerR = PLUTCHIK_RADII.intensity2;
            outerR = PLUTCHIK_RADII.intensity1;
            break;
          case 2: // Middle
            innerR = PLUTCHIK_RADII.intensity3;
            outerR = PLUTCHIK_RADII.intensity2;
            break;
          case 3: // Innermost
            innerR = PLUTCHIK_RADII.centerCircle; // Or 0 for a pie slice, but centerCircle gives a nice gap
            outerR = PLUTCHIK_RADII.intensity3;
            break;
          default: return; // Should not happen
        }

        const pathData = getArcPathData(innerR, outerR, petalStartAngle, petalEndAngle, SVG_CENTER, SVG_CENTER);
        
        const midAngle = petalStartAngle + anglePerPetal / 2;
        const midRadius = (innerR + outerR) / 2;
        const [textX, textY] = getCoordinates(midAngle, midRadius, SVG_CENTER, SVG_CENTER);
        
        let textRotation = midAngle;
        if (midAngle > 90 && midAngle < 270) { // Make text readable on the left side
          textRotation += 180;
        }

        segments.push({
          ...emotion,
          pathData,
          textPosition: { x: textX, y: textY, rotation: textRotation },
        });
      });
    });
    return segments;
  }, []);

  return (
    <div className="space-y-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      
      <div className="flex flex-col items-center space-y-4 p-2 sm:p-4 border border-gray-200 rounded-md bg-gray-50">
        <svg 
          viewBox={`0 0 ${SVG_VIEWBOX_SIZE} ${SVG_VIEWBOX_SIZE}`} 
          aria-label="Roda de Emoções de Plutchik"
          className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md aspect-square" // Responsive SVG
        >
          {wheelSegments.map((segment) => (
            <g key={segment.id} className="cursor-pointer group"
              onMouseEnter={() => setHoveredEmotion(segment)}
              onMouseLeave={() => setHoveredEmotion(null)}
              onClick={() => handleAddEmotion(segment)}
              aria-label={segment.name}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAddEmotion(segment); }}
            >
              <path
                d={segment.pathData}
                fill={segment.color}
                stroke={hoveredEmotion?.id === segment.id ? HOVER_STROKE_COLOR : SLICE_STROKE_COLOR}
                strokeWidth={hoveredEmotion?.id === segment.id ? HOVER_STROKE_WIDTH : STROKE_WIDTH}
                className="transition-all duration-100 ease-in-out"
              />
              <text
                x={segment.textPosition.x}
                y={segment.textPosition.y}
                transform={`rotate(${segment.textPosition.rotation}, ${segment.textPosition.x}, ${segment.textPosition.y})`}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={TEXT_FONT_SIZE}
                fill={TEXT_COLOR}
                className="pointer-events-none font-medium"
                style={{ userSelect: 'none' }}
              >
                {segment.name}
              </text>
            </g>
          ))}
          <circle cx={SVG_CENTER} cy={SVG_CENTER} r={PLUTCHIK_RADII.centerCircle} fill="white" stroke={SLICE_STROKE_COLOR} strokeWidth={STROKE_WIDTH} />
          <text
            x={SVG_CENTER}
            y={SVG_CENTER}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs sm:text-sm font-semibold fill-gray-700 pointer-events-none"
            aria-live="polite"
          >
            {hoveredEmotion ? hoveredEmotion.name : 'Escolha'}
          </text>
        </svg>
        <p className="text-xs text-gray-500 text-center">Clique em uma emoção na roda para adicioná-la.</p>
      </div>

      {selectedEmotions.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-md font-semibold text-gray-800">Emoções Selecionadas:</h4>
          <ul className="space-y-2">
            {selectedEmotions.map((emotion) => (
              <li key={emotion.emotionId} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md shadow-sm">
                <span className="text-gray-700">{emotion.name}</span>
                <div className="flex items-center space-x-3">
                  <label htmlFor={`${idPrefix}-${emotion.emotionId}-intensity`} className="sr-only">Intensidade para {emotion.name}</label>
                  <input
                    type="range"
                    id={`${idPrefix}-${emotion.emotionId}-intensity`}
                    min="0"
                    max="100"
                    value={emotion.intensity}
                    onChange={(e) => handleIntensityChange(emotion.emotionId, Number(e.target.value))}
                    className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                    aria-label={`Intensidade para ${emotion.name}`}
                  />
                  <span className="text-sm text-gray-600 w-8 text-right">{emotion.intensity}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEmotion(emotion.emotionId)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                    aria-label={`Remover ${emotion.name}`}
                  >
                    &times;
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmotionSelector;
