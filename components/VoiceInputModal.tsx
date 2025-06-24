import React from "react";

interface VoiceInputModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  dontShowAgain: boolean;
  setDontShowAgain: (value: boolean) => void;
}

const VoiceInputModal: React.FC<VoiceInputModalProps> = ({
  isOpen,
  onConfirm,
  onClose,
  dontShowAgain,
  setDontShowAgain,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center"
      id="my-modal"
    >
      <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Aviso de Privacidade da Entrada de Voz
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Nos preocupamos com a segurança dos seus dados. Muitos celulares
              utilizam serviços em nuvem para processar a fala, o que pode
              enviar sua voz para servidores de terceiros.
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Para uma experiência totalmente privada e offline, recomendamos a
              instalação de um teclado com essa funcionalidade, como o{" "}
              <a
                href="https://voiceinput.futo.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:text-sky-800"
              >
                FUTO Voice Input
              </a>
              .
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <div className="flex items-center justify-center mb-4">
              <input
                id="dont-show-again"
                name="dont-show-again"
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
              />
              <label
                htmlFor="dont-show-again"
                className="ml-2 block text-sm text-gray-900"
              >
                Não mostrar novamente
              </label>
            </div>
            <button
              id="confirm-btn"
              onClick={onConfirm}
              className="px-4 py-2 bg-sky-600 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              Continuar
            </button>
            <button
              id="cancel-btn"
              onClick={onClose}
              className="ml-3 px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-auto shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceInputModal; 