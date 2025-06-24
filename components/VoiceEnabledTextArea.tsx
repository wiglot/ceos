import React, { useRef, useEffect, useCallback } from "react";

// Using a generic SVG for the microphone icon to avoid external dependencies
const MicrophoneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
    <path d="M19 10v2a7 7 0 01-14 0v-2H3v2a9 9 0 008 8.94V23h2v-2.06A9 9 0 0021 12v-2h-2z" />
  </svg>
);

interface VoiceEnabledTextAreaProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows: number;
  label: string;
  showVoiceButton: boolean;
  isListening: boolean;
  onVoiceClick: () => void;
  onVoiceResult: (transcript: string) => void;
  startApiListening?: () => void; // Optional prop for API-based listening
  hasApiSupport: boolean;
  required?: boolean;
  subLabel?: string;
}

const VoiceEnabledTextArea: React.FC<VoiceEnabledTextAreaProps> = ({
  id,
  value,
  onChange,
  rows,
  label,
  showVoiceButton,
  isListening,
  onVoiceClick,
  onVoiceResult,
  startApiListening,
  hasApiSupport,
  required,
  subLabel,
}) => {
  const fallbackInputRef = useRef<HTMLInputElement>(null);

  const handleFallbackResult = (event: React.ChangeEvent<HTMLInputElement>) => {
    const transcript = event.target.value;
    if (transcript) {
      onVoiceResult(transcript);
    }
    if (fallbackInputRef.current) {
      fallbackInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    onVoiceClick(); // Notify parent to handle state
    if (hasApiSupport && startApiListening) {
        startApiListening();
    } else {
      // Fallback for browsers without API support (like Firefox)
      fallbackInputRef.current?.click();
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {subLabel && <p className="text-xs text-gray-500 mb-2">{subLabel}</p>}
      <div className="relative">
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm resize-vertical pr-10"
        />
        {!hasApiSupport && (
           <input
             ref={fallbackInputRef}
             type="text"
             onChange={handleFallbackResult}
             style={{ display: "none" }}
             {...{ "x-webkit-speech": "x-webkit-speech" }}
           />
        )}
        {showVoiceButton && (
          <button
            type="button"
            onClick={handleClick}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors duration-200 ${
              isListening
                ? "text-red-500 bg-red-100"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            aria-label="Ativar entrada de voz"
          >
            <MicrophoneIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default VoiceEnabledTextArea; 