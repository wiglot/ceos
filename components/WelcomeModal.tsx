import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import Modal from './Modal'; // Reutilizando o componente de modal genérico

const WelcomeModal: React.FC = () => {
  const [hideModalPermanently, setHideModalPermanently] = useLocalStorage('hideWelcomeModal', false);
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Mostra o modal apenas se o usuário não tiver marcado para ocultar permanentemente
    if (!hideModalPermanently) {
      setIsOpen(true);
    }
  }, [hideModalPermanently]);

  const handleClose = () => {
    if (dontShowAgain) {
      setHideModalPermanently(true);
    }
    setIsOpen(false);
  };

  const modalTitle = "Boas-vindas ao seu Diário de Pensamentos!";
  
  const modalContent = (
    <div className="text-left text-gray-700 space-y-4">
      <p>
        Olá! Ficamos felizes em ver você por aqui. Esta é uma ferramenta de uso pessoal, desenvolvida com carinho pela <strong>Céos</strong> para auxiliar você no cuidado com a sua saúde mental.
      </p>
      <p className="font-bold text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
        Sua privacidade é nossa prioridade máxima. Absolutamente nenhum dado que você registrar aqui é enviado para qualquer servidor. Todas as suas informações ficam salvas exclusivamente no seu navegador.
      </p>
      <p>
        Este aplicativo utiliza o método de <strong>Registro de Pensamento Disfuncional </strong>, uma técnica poderosa da Terapia Cognitivo-Comportamental que pode ajudar você a entender melhor seus padrões de pensamento.
      </p>
      <p>
        Para saber mais sobre como a ferramenta funciona e como ela pode ser uma grande aliada em sua jornada terapêutica, confira nossa página explicativa.
      </p>
      <div className="text-center mt-4">
        <Link 
          to="/about-method" 
          onClick={handleClose}
          className="text-sky-600 hover:text-sky-800 font-semibold transition-colors"
        >
          Entenda o Método e seus Benefícios
        </Link>
      </div>
    </div>
  );

  const modalFooter = (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center">
        <input
          id="dont-show-again"
          type="checkbox"
          checked={dontShowAgain}
          onChange={(e) => setDontShowAgain(e.target.checked)}
          className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
        />
        <label htmlFor="dont-show-again" className="ml-2 block text-sm text-gray-800">
          Não mostrar esta mensagem novamente
        </label>
      </div>
      <button
        onClick={handleClose}
        className="w-full sm:w-auto px-6 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm transition-colors"
      >
        Entendido, começar a usar!
      </button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={modalTitle} footer={modalFooter}>
      {modalContent}
    </Modal>
  );
};

export default WelcomeModal; 