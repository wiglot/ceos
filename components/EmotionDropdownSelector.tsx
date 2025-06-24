import React, { useState } from 'react';
import { Emotion, SelectedEmotion } from '../types';
import { PLUTCHIK_EMOTIONS_DEFINITIONS, PLUTCHIK_BASE_EMOTIONS_ORDER } from '../constants';
import EmotionInfo from './EmotionInfo';

interface EmotionDropdownSelectorProps {
  selectedEmotions: SelectedEmotion[];
  onChange: (emotions: SelectedEmotion[]) => void;
  label?: string;
}

// Exemplo de mapeamento de pictogramas (comentado)
const EMOTION_ICONS: Record<string, string> = {
   alegria: '🙂',
   medo: '😱',
   tristeza: '😢',
   nojo: '🤢',
   raiva: '😡',
   surpresa: '😮',
   confiança: '🤝',
   antecipação: '⏳',
   custom: '✏️',
};

// Função utilitária para pegar a cor da emoção pelo id
const getEmotionColor = (emotionId: string) => {
  if (emotionId.startsWith('custom_')) {
    return '#000000'; // Cor preta para emoções customizadas
  }
  const emotion = PLUTCHIK_EMOTIONS_DEFINITIONS.find(e => e.id === emotionId);
  return emotion ? emotion.color : '#ccc';
};

const getEmotionById = (emotionId: string): Emotion | undefined => {
  return PLUTCHIK_EMOTIONS_DEFINITIONS.find(e => e.id === emotionId);
};

const EmotionDropdownSelector: React.FC<EmotionDropdownSelectorProps> = ({ selectedEmotions, onChange, label }) => {
  const [openPrimary, setOpenPrimary] = useState<string | null>(null);
  const [selected, setSelected] = useState<Emotion | null>(null);
  const [intensity, setIntensity] = useState<number>(50);
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customEmotionName, setCustomEmotionName] = useState('');

  // Agrupa emoções por base
  const groupedEmotions = PLUTCHIK_BASE_EMOTIONS_ORDER.map(base => {
    return {
      base,
      emotions: PLUTCHIK_EMOTIONS_DEFINITIONS.filter(e => e.baseEmotion === base).sort((a, b) => a.intensityLevel - b.intensityLevel)
    };
  });

  const handleSelectEmotion = (emotion: Emotion) => {
    setSelected(emotion);
    setIsAddingCustom(false);
    setIntensity(50);
  };

  const handleAddEmotion = () => {
    if (selected && !selectedEmotions.find(e => e.emotionId === selected.id)) {
      onChange([...selectedEmotions, { emotionId: selected.id, name: selected.name, intensity }]);
      setSelected(null);
      setIntensity(50);
    }
  };

  const handleAddCustomEmotion = () => {
    if (customEmotionName.trim()) {
      onChange([
        ...selectedEmotions,
        {
          emotionId: `custom_${Date.now()}`,
          name: customEmotionName.trim(),
          intensity,
        },
      ]);
      setCustomEmotionName('');
      setIsAddingCustom(false);
      setIntensity(50);
    }
  };

  const handleRemoveEmotion = (emotionId: string) => {
    onChange(selectedEmotions.filter(e => e.emotionId !== emotionId));
  };

  const handleIntensityChange = (emotionId: string, newIntensity: number) => {
    const updatedEmotions = selectedEmotions.map(emotion =>
      emotion.emotionId === emotionId ? { ...emotion, intensity: newIntensity } : emotion
    );
    onChange(updatedEmotions);
  };

  return (
    <div className="space-y-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      {/* Dropdown customizado */}
      <div className="relative">
        <button
          type="button"
          className="w-full border border-gray-300 rounded-md bg-white px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          aria-haspopup="listbox"
          aria-expanded={!!openPrimary}
          onClick={() => setOpenPrimary(openPrimary ? null : 'open')}
        >
          {selected ? (
            <span className="flex items-center">
              <span className="inline-block w-6 h-6 rounded mr-2 flex items-center justify-center text-lg" style={{ background: selected.color }}>
                {EMOTION_ICONS[selected.baseEmotion.toLowerCase()] || ''}
              </span>
              <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{selected.name}</span>
            </span>
          ) : (
            <span className="text-gray-400">Escolha uma emoção.. 😱 😢 😮 ⏳</span>
          )}
        </button>
        {openPrimary && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-72 overflow-y-auto">
            {groupedEmotions.map(group => (
              <div key={group.base}>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 font-bold bg-gray-50 hover:bg-gray-100 border-b border-gray-200 flex items-center"
                  onClick={() => setOpenPrimary(group.base === openPrimary ? 'open' : group.base)}
                  aria-expanded={openPrimary === group.base}
                >
                  <span className="inline-block w-6 h-6 rounded mr-2 flex items-center justify-center text-lg" style={{ background: group.emotions[0].color }}>
                    {EMOTION_ICONS[group.base.toLowerCase()] || ''}
                  </span>
                  <span style={{ color: 'var(--color-text)' }}>{group.base}</span>
                </button>
                {openPrimary === group.base && (
                  <div className="pl-6">
                    {group.emotions.map(emotion => (
                      <button
                        key={emotion.id}
                        type="button"
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center border-b border-gray-200 bg-gray-50"
                        onClick={() => { handleSelectEmotion(emotion); setOpenPrimary(null); }}
                      >
                        <span className="inline-block w-5 h-5 rounded mr-2" style={{ background: emotion.color }} />
                        <span style={{ wordBreak: 'break-word', color: 'var(--color-text)' }} >{emotion.name}</span>
                          <EmotionInfo emotion={emotion} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="border-t border-gray-200">
              <button
                type="button"
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                onClick={() => {
                  setIsAddingCustom(true);
                  setSelected(null);
                  setOpenPrimary(null);
                }}
              >
                <span className="inline-block w-5 h-5 rounded mr-2 flex items-center justify-center bg-black text-white text-sm">
                  {EMOTION_ICONS.custom}
                </span>
                <span style={{ color: 'var(--color-text)' }}>Descrever como me sinto...</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {isAddingCustom && (
        <div className="flex flex-col sm:flex-row items-center gap-4 p-3 border border-gray-200 rounded-md bg-gray-50">
          <div className="flex-1">
             <label htmlFor="customEmotionName" className="block text-sm text-gray-700 mb-1">Qual emoção você está sentindo?</label>
             <input
              type="text"
              id="customEmotionName"
              value={customEmotionName}
              onChange={(e) => setCustomEmotionName(e.target.value)}
              placeholder="Ex: Frustrado, culpado, aliviado..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">Intensidade:</label>
            <div className="flex items-center">
              <input
                type="range"
                min={0}
                max={100}
                value={intensity}
                onChange={e => setIntensity(Number(e.target.value))}
                style={{ accentColor: '#000000', width: '100%' }}
                aria-label="Intensidade para emoção customizada"
              />
              <span className="text-sm text-gray-600 ml-2 w-8 text-right">{intensity}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddCustomEmotion}
            className="px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm"
          >
            Adicionar
          </button>
        </div>
      )}

      {/* Intensidade e adicionar */}
      {selected && (
        <div className="flex flex-col sm:flex-row items-center gap-4 p-3 border border-gray-200 rounded-md bg-gray-50">
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">Intensidade:</label>
            <input
              type="range"
              min={0}
              max={100}
              value={intensity}
              onChange={e => setIntensity(Number(e.target.value))}
              style={{ accentColor: selected.color, width: '100%' }}
              aria-label={`Intensidade para ${selected.name}`}
            />
            <span className="text-sm text-gray-600 ml-2">{intensity}</span>
          </div>
          <button
            type="button"
            onClick={handleAddEmotion}
            className="px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm"
          >
            Adicionar
          </button>
        </div>
      )}
      {/* Lista de emoções selecionadas */}
      {selectedEmotions.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-md font-semibold text-gray-800">Emoções Selecionadas:</h4>
          <ul className="space-y-2">
            {selectedEmotions.map((emotion) => {
              const isCustom = emotion.emotionId.startsWith('custom_');
              const emotionIcon = isCustom
                ? EMOTION_ICONS.custom
                : EMOTION_ICONS[getEmotionById(emotion.emotionId)?.baseEmotion.toLowerCase() || ''] || '';

              return (
                <li key={emotion.emotionId} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md shadow-sm">
                  <span className="flex items-center">
                    <span
                      className="inline-block w-5 h-5 rounded mr-2 flex items-center justify-center text-md"
                      style={{
                        background: getEmotionColor(emotion.emotionId),
                        color: isCustom ? 'white' : 'black',
                      }}
                    >
                      {emotionIcon}
                    </span>
                    <span style={{ wordBreak: 'break-word', color: 'var(--color-text)' }}>{emotion.name}</span>
                  </span>
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={emotion.intensity}
                      onChange={(e) => handleIntensityChange(emotion.emotionId, Number(e.target.value))}
                      className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      style={{ accentColor: getEmotionColor(emotion.emotionId) }}
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
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmotionDropdownSelector; 