import React, { useState, useMemo, useRef } from 'react';
import { SelectedEmotion, Emotion } from '../types';
import { PLUTCHIK_EMOTIONS_DEFINITIONS, PLUTCHIK_BASE_EMOTIONS_ORDER, PLUTCHIK_RADII, SVG_VIEWBOX_SIZE, SVG_CENTER } from '../constants';

interface EmotionSelectorProps {
  idPrefix: string;
  selectedEmotions: SelectedEmotion[];
  onChange: (emotions: SelectedEmotion[]) => void;
  label?: string;
}

// Tokens CSS para stroke e texto
const SLICE_STROKE_COLOR = 'var(--color-secondary)';
const HOVER_STROKE_COLOR = 'var(--color-primary-dark)';
const STROKE_WIDTH = 1;
const HOVER_STROKE_WIDTH = 3;
const TEXT_COLOR = 'var(--color-text)';
const TEXT_FONT_SIZE = 12;

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

const getArcTextPath = (
  radius: number,
  startAngle: number,
  endAngle: number,
  centerX: number,
  centerY: number,
  id: string
) => {
  // Gera um arco para textPath
  const [startX, startY] = getCoordinates(startAngle, radius, centerX, centerY);
  const [endX, endY] = getCoordinates(endAngle, radius, centerX, centerY);
  const largeArcFlag = (endAngle - startAngle) <= 180 ? 0 : 1;
  return (
    <path
      id={id}
      d={`M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`}
      fill="none"
      stroke="none"
    />
  );
};

const isTouchDevice = () => {
  return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
};

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ idPrefix, selectedEmotions, onChange, label }: EmotionSelectorProps) => {
  const [hoveredEmotion, setHoveredEmotion] = useState<Emotion | null>(null);
  const [longPressEmotion, setLongPressEmotion] = useState<Emotion | null>(null);
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleAddEmotion = (emotion: Emotion) => {
    if (!selectedEmotions.find(e => e.emotionId === emotion.id)) {
      onChange([...selectedEmotions, { emotionId: emotion.id, name: emotion.name, intensity: 50 }]);
    }
  };

  const handleRemoveEmotion = (emotionIdToRemove: string) => {
    onChange(selectedEmotions.filter((e: SelectedEmotion) => e.emotionId !== emotionIdToRemove));
  };

  const handleIntensityChange = (emotionIdToUpdate: string, newIntensity: number) => {
    onChange(selectedEmotions.map((e: SelectedEmotion) => e.emotionId === emotionIdToUpdate ? { ...e, intensity: newIntensity } : e));
  };

  const wheelSegments = useMemo(() => {
    const segments: Array<Emotion & { pathData: string; textPathId: string; arcTextRadius: number; arcTextStart: number; arcTextEnd: number }> = [];
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

        // Para o texto ao redor, sempre usar o raio externo + margem
        const arcTextRadius = outerR + 12;
        const textPathId = `arc-text-${emotion.id}`;
        segments.push({
          ...emotion,
          pathData: getArcPathData(innerR, outerR, petalStartAngle, petalEndAngle, SVG_CENTER, SVG_CENTER),
          textPathId,
          arcTextRadius,
          arcTextStart: petalStartAngle + 5, // margem para não colar no vizinho
          arcTextEnd: petalEndAngle - 5,
        });
      });
    });
    return segments;
  }, []);

  // Eventos de long press para mobile
  const handleTouchStart = (emotion: Emotion) => {
    if (longPressTimeout.current) clearTimeout(longPressTimeout.current);
    longPressTimeout.current = setTimeout(() => {
      setLongPressEmotion(emotion);
    }, 500); // 500ms para considerar long press
  };
  const handleTouchEnd = () => {
    if (longPressTimeout.current) clearTimeout(longPressTimeout.current);
    setLongPressEmotion(null);
  };

  // Efeito de "explosão" das camadas internas
  const getExplodeOffset = (emotion: Emotion) => {
    if (!hoveredEmotion || hoveredEmotion.id !== emotion.id) return 0;
    // Quanto mais interna, mais "explode"
    switch (emotion.intensityLevel) {
      case 3: return 40;
      case 2: return 25;
      case 1: return 10;
      default: return 0;
    }
  };

  return (
    <div className="space-y-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      
      <div className="flex flex-col items-center space-y-4 p-2 sm:p-4 border border-gray-200 rounded-md bg-gray-50">
        <div style={{width: '100%', maxWidth: 340, aspectRatio: '1/1', position: 'relative'}}>
          <svg
            viewBox={`0 0 ${SVG_VIEWBOX_SIZE} ${SVG_VIEWBOX_SIZE}`}
            aria-label="Roda de Emoções de Plutchik"
            style={{width: '100%', height: 'auto', display: 'block'}}
            tabIndex={0}
            role="group"
          >
            {wheelSegments.map((segment, i) => {
              // Efeito explode
              const explode = getExplodeOffset(segment);
              const pathData = getArcPathData(
                segment.intensityLevel === 3 ? PLUTCHIK_RADII.centerCircle : (segment.intensityLevel === 2 ? PLUTCHIK_RADII.intensity3 : PLUTCHIK_RADII.intensity2),
                segment.intensityLevel === 3 ? PLUTCHIK_RADII.intensity3 + explode : (segment.intensityLevel === 2 ? PLUTCHIK_RADII.intensity2 + explode : PLUTCHIK_RADII.intensity1 + explode),
                segment.arcTextStart - 5,
                segment.arcTextEnd + 5,
                SVG_CENTER,
                SVG_CENTER
              );
              const isHovered = hoveredEmotion?.id === segment.id || longPressEmotion?.id === segment.id;
              return (
                <g
                  key={segment.id}
                  className="emotion-segment"
                  tabIndex={0}
                  aria-label={segment.name}
                  role="button"
                  onMouseEnter={() => !isTouchDevice() && setHoveredEmotion(segment)}
                  onMouseLeave={() => !isTouchDevice() && setHoveredEmotion(null)}
                  onClick={() => handleAddEmotion(segment)}
                  onKeyDown={(e: React.KeyboardEvent<SVGGElement>) => { if (e.key === 'Enter' || e.key === ' ') handleAddEmotion(segment); }}
                  onTouchStart={() => handleTouchStart(segment)}
                  onTouchEnd={handleTouchEnd}
                  style={{ cursor: 'pointer' }}
                >
                  <path
                    d={pathData}
                    fill={segment.color}
                    stroke={isHovered ? HOVER_STROKE_COLOR : SLICE_STROKE_COLOR}
                    strokeWidth={isHovered ? HOVER_STROKE_WIDTH : STROKE_WIDTH}
                    style={{
                      transition: 'stroke-width var(--transition), stroke var(--transition), filter var(--transition), d 0.3s cubic-bezier(.4,2,.6,1)',
                      filter: isHovered ? 'drop-shadow(0 0 8px rgba(0,0,0,0.15))' : 'none',
                    }}
                  />
                  {/* Texto ao redor do arco */}
                  {getArcTextPath(segment.arcTextRadius, segment.arcTextStart, segment.arcTextEnd, SVG_CENTER, SVG_CENTER, segment.textPathId)}
                  <text
                    fontSize={TEXT_FONT_SIZE}
                    fill={TEXT_COLOR}
                    fontWeight={isHovered ? 700 : 500}
                    style={{
                      letterSpacing: 1,
                      textShadow: '0 1px 2px #fff',
                      userSelect: 'none',
                      pointerEvents: 'none',
                      transition: 'font-size var(--transition)',
                    }}
                  >
                    <textPath
                      href={`#${segment.textPathId}`}
                      startOffset="50%"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      dominantBaseline="middle"
                    >
                      {segment.name}
                    </textPath>
                  </text>
                </g>
              );
            })}
            {/* Círculo central */}
            <circle cx={SVG_CENTER} cy={SVG_CENTER} r={PLUTCHIK_RADII.centerCircle} fill="white" stroke={SLICE_STROKE_COLOR} strokeWidth={STROKE_WIDTH} />
            {/* Nome da emoção selecionada centralizado, responsivo, sem corte */}
            <foreignObject
              x={SVG_CENTER - PLUTCHIK_RADII.centerCircle + 2}
              y={SVG_CENTER - PLUTCHIK_RADII.centerCircle + 2}
              width={PLUTCHIK_RADII.centerCircle * 2 - 4}
              height={PLUTCHIK_RADII.centerCircle * 2 - 4}
              style={{ pointerEvents: 'none' }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(0.7rem, 1.5vw, 1.1rem)',
                  fontWeight: 700,
                  color: 'var(--color-primary-dark)',
                  textAlign: 'center',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.1,
                  padding: 2,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.85)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  userSelect: 'none',
                }}
                aria-live="polite"
              >
                {hoveredEmotion?.name || longPressEmotion?.name || 'Escolha'}
              </div>
            </foreignObject>
          </svg>
          {/* Tooltip para mobile (long press) */}
          {longPressEmotion && isTouchDevice() && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -120%)',
                background: longPressEmotion.color,
                color: '#222',
                padding: '0.5em 1em',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                zIndex: 10,
                pointerEvents: 'none',
                minWidth: 80,
                textAlign: 'center',
              }}
            >
              {longPressEmotion.name}
            </div>
          )}
        </div>
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
