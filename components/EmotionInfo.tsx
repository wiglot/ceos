import React, { useState, useRef } from 'react';
import { Emotion } from '../types';

interface EmotionInfoProps {
  emotion: Emotion;
}

const EmotionInfo: React.FC<EmotionInfoProps> = ({ emotion }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number }>({ visible: false, x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const fullDescriptionHtml = { __html: emotion.definition?.replace(/\n/g, '<br />') || 'Nenhuma definição disponível.' };
  const tooltipDescription = emotion.definition?.split('\n')[0] || 'Nenhuma definição disponível.';

  const showTooltip = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setTooltip({
        visible: true,
        x: rect.left + rect.width / 2, // Center horizontally
        y: rect.top, // Position above the button
      });
    }
  };

  const hideTooltip = () => {
    setTooltip({ visible: false, x: 0, y: 0 });
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setModalOpen(true);
        }}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="ml-2 text-sky-600 hover:text-sky-800 cursor-pointer flex items-center justify-center w-5 h-5 rounded-full border border-sky-600 flex-shrink-0 p-0"
        aria-label={`Informações sobre ${emotion.name}`}
      >
        ?
      </button>

      {/* Tooltip (Rendered with a Portal-like fixed position) */}
      {tooltip.visible && (
        <div
          className="fixed bg-gray-800 text-white text-xs rounded py-2 px-3 z-50 pointer-events-none transition-opacity duration-300"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -110%)', // Adjust to be above and centered
          }}
        >
          {tooltipDescription}
          <div className="text-gray-400 text-center mt-1">Clique para mais detalhes</div>
        </div>
      )}


      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar dentro do modal
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              aria-label="Fechar modal"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4 text-black">
              {emotion.name}
            </h3>
            <div
              className="text-gray-700 space-y-4"
              dangerouslySetInnerHTML={fullDescriptionHtml}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EmotionInfo; 