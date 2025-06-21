import React from 'react';
import { Emotion, SelectedEmotion } from '../types';
import { PLUTCHIK_EMOTIONS_DEFINITIONS, PLUTCHIK_BASE_EMOTIONS_ORDER } from '../constants';

interface EmotionTableSelectorProps {
  selectedEmotions: SelectedEmotion[];
  onChange: (emotions: SelectedEmotion[]) => void;
  label?: string;
}

const getEmotionColor = (emotionId: string) => {
  const emotion = PLUTCHIK_EMOTIONS_DEFINITIONS.find(e => e.id === emotionId);
  return emotion ? emotion.color : '#ccc';
};

const getEmotionById = (emotionId: string) => {
  return PLUTCHIK_EMOTIONS_DEFINITIONS.find(e => e.id === emotionId);
};

const EmotionTableSelector: React.FC<EmotionTableSelectorProps> = ({ selectedEmotions, onChange, label }) => {
  // Adiciona emoção
  const handleAddEmotion = (emotion: Emotion) => {
    if (!selectedEmotions.find(e => e.emotionId === emotion.id)) {
      onChange([...selectedEmotions, { emotionId: emotion.id, name: emotion.name, intensity: 50 }]);
    }
  };

  // Remove emoção
  const handleRemoveEmotion = (emotionIdToRemove: string) => {
    onChange(selectedEmotions.filter(e => e.emotionId !== emotionIdToRemove));
  };

  // Altera intensidade
  const handleIntensityChange = (emotionIdToUpdate: string, newIntensity: number) => {
    onChange(selectedEmotions.map(e => e.emotionId === emotionIdToUpdate ? { ...e, intensity: newIntensity } : e));
  };

  // Agrupa emoções por base
  const groupedEmotions = PLUTCHIK_BASE_EMOTIONS_ORDER.map(base => {
    return {
      base,
      emotions: PLUTCHIK_EMOTIONS_DEFINITIONS.filter(e => e.baseEmotion === base).sort((a, b) => a.intensityLevel - b.intensityLevel)
    };
  });

  return (
    <div className="space-y-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg bg-white">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Emoção</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Cor</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Intensidade</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Selecionar</th>
            </tr>
          </thead>
          <tbody>
            {groupedEmotions.map(group => (
              <React.Fragment key={group.base}>
                <tr>
                  <td colSpan={4} className="bg-gray-50 font-bold px-3 py-2 text-gray-700 border-t border-b border-gray-200">{group.base}</td>
                </tr>
                {group.emotions.map(emotion => {
                  const selected = selectedEmotions.find(e => e.emotionId === emotion.id);
                  return (
                    <tr
                      key={emotion.id}
                      className="transition-all duration-150 hover:bg-gray-100 group"
                      style={{ boxShadow: selected ? '0 2px 8px 0 rgba(0,0,0,0.07)' : undefined }}
                    >
                      <td className="px-3 py-2 max-w-xs whitespace-normal">
                        <span
                          style={{
                            fontWeight: selected ? 700 : 500,
                            fontSize: '1rem',
                            color: selected ? 'var(--color-primary-dark)' : 'var(--color-text)',
                            wordBreak: 'break-word',
                          }}
                          title={emotion.name.length > 16 ? emotion.name : undefined}
                        >
                          {emotion.name}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          style={{
                            display: 'inline-block',
                            width: 28,
                            height: 18,
                            borderRadius: 6,
                            background: emotion.color,
                            border: '1px solid #bbb',
                          }}
                          title={emotion.color}
                        />
                      </td>
                      <td className="px-3 py-2">
                        {selected ? (
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={selected.intensity}
                            onChange={e => handleIntensityChange(emotion.id, Number(e.target.value))}
                            style={{
                              accentColor: emotion.color,
                              width: 100,
                            }}
                            aria-label={`Intensidade para ${emotion.name}`}
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {selected ? (
                          <button
                            type="button"
                            onClick={() => handleRemoveEmotion(emotion.id)}
                            className="text-red-500 hover:text-red-700 font-semibold px-2 py-1 rounded transition-colors"
                            aria-label={`Remover ${emotion.name}`}
                          >
                            Remover
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAddEmotion(emotion)}
                            className="text-sky-600 hover:text-sky-800 font-semibold px-2 py-1 rounded transition-colors"
                            aria-label={`Selecionar ${emotion.name}`}
                          >
                            Selecionar
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmotionTableSelector; 