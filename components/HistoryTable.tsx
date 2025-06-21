import React, { useState } from 'react';
import { DysfunctionalThoughtEntry, SelectedEmotion } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import Modal from './Modal';

const HistoryTable: React.FC = () => {
  const [entries, setEntries] = useLocalStorage<DysfunctionalThoughtEntry[]>('dysfunctionalThoughts', [], { encrypt: true });
  const [selectedEntry, setSelectedEntry] = useState<DysfunctionalThoughtEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [entryToDelete, setEntryToDelete] = useState<DysfunctionalThoughtEntry | null>(null);

  const handleClearAllData = () => {
    const isConfirmed = window.confirm("Você tem certeza que deseja apagar TODOS os registros? Esta ação não pode ser desfeita.");
    if (isConfirmed) {
      setEntries([]);
    }
  };

  const viewEntry = (entry: DysfunctionalThoughtEntry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  const requestDeleteEntry = (entry: DysfunctionalThoughtEntry) => {
    setEntryToDelete(entry);
  };

  const confirmDeleteEntry = () => {
    if (entryToDelete) {
      setEntries(entries.filter(e => e.id !== entryToDelete.id));
      setEntryToDelete(null); // Close confirmation
    }
  };

  const cancelDeleteEntry = () => {
    setEntryToDelete(null);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatEmotions = (emotions: SelectedEmotion[]): string => {
    if (!emotions || emotions.length === 0) return 'Nenhuma';
    return emotions.map(e => `${e.name} (${e.intensity})`).join(', ');
  };

  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (entries.length === 0) {
    return <p className="text-center text-gray-600 text-lg mt-10">Nenhum registro encontrado. Comece adicionando um novo!</p>;
  }

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-x-auto">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-sky-800">Histórico de Pensamentos</h2>
        {entries.length > 0 && (
          <button 
            onClick={handleClearAllData} 
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md shadow-sm transition-colors"
          >
            Limpar Tudo
          </button>
        )}
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Situação (Resumo)</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reflexões (Resumo)</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emoções Finais</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedEntries.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(entry.date)}</td>
              <td className="px-6 py-4 whitespace-normal text-sm text-gray-700 max-w-xs truncate">{entry.situation}</td>
              <td className="px-6 py-4 whitespace-normal text-sm text-gray-700 max-w-xs truncate">
                {entry.alternativeResponses.length > 0 ? entry.alternativeResponses.map(r => r.text).join('; ') : 'Nenhuma'}
              </td>
              <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">{formatEmotions(entry.reassessment.currentEmotions)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button onClick={() => viewEntry(entry)} className="text-sky-600 hover:text-sky-800 transition-colors">Ver</button>
                <button onClick={() => requestDeleteEntry(entry)} className="text-red-600 hover:text-red-800 transition-colors">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedEntry && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={`Detalhes do Registro - ${formatDate(selectedEntry.date)}`}>
          <div className="space-y-4 text-sm text-gray-700">
            <div><strong>Situação:</strong> <p className="mt-1 whitespace-pre-wrap">{selectedEntry.situation}</p></div>
            <div><strong>Emoções Iniciais:</strong> <p className="mt-1">{formatEmotions(selectedEntry.initialEmotions)}</p></div>
            <div>
              <strong>Pensamentos Automáticos:</strong>
              <ul className="list-disc list-inside mt-1">
                {selectedEntry.automaticThoughts.map(t => <li key={t.id}>{t.text} (Convicção: {t.conviction})</li>)}
              </ul>
            </div>
            <div>
              <strong>Respostas Alternativas:</strong>
              <ul className="list-disc list-inside mt-1">
                {selectedEntry.alternativeResponses.map(r => <li key={r.id}>{r.text} (Crença: {r.belief})</li>)}
              </ul>
            </div>
            <hr className="my-3"/>
            <h4 className="font-semibold text-md text-sky-700">Reavaliação:</h4>
            <div>
              <strong>Pensamentos Reavaliados:</strong>
              <ul className="list-disc list-inside mt-1">
                {selectedEntry.reassessment.reEvaluatedThoughts.map(t => <li key={`reval-${t.id}`}>{t.text} (Nova Convicção: {t.conviction})</li>)}
              </ul>
            </div>
            <div><strong>Emoções Atuais:</strong> <p className="mt-1">{formatEmotions(selectedEntry.reassessment.currentEmotions)}</p></div>
            <div><strong>Plano de Ação:</strong> <p className="mt-1 whitespace-pre-wrap">{selectedEntry.reassessment.actionPlan || 'Nenhum'}</p></div>
          </div>
        </Modal>
      )}

      {entryToDelete && (
        <Modal isOpen={true} onClose={cancelDeleteEntry} title="Confirmar Exclusão">
            <p className="text-gray-700 mb-4">Tem certeza que deseja excluir este registro de {formatDate(entryToDelete.date)}?</p>
            <p className="text-gray-600 text-sm mb-1"><strong>Situação:</strong> {entryToDelete.situation.substring(0,100)}{entryToDelete.situation.length > 100 ? '...' : ''}</p>
            <div className="mt-6 flex justify-end space-x-3">
                <button
                    onClick={cancelDeleteEntry}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md shadow-sm"
                >
                    Cancelar
                </button>
                <button
                    onClick={confirmDeleteEntry}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md shadow-sm"
                >
                    Excluir
                </button>
            </div>
        </Modal>
      )}

    </div>
  );
};

export default HistoryTable;
