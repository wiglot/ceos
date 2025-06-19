import React, { useState, FormEvent, useCallback } from "react";
import {
  DysfunctionalThoughtEntry,
  SelectedEmotion,
  ThoughtRecord,
  AlternativeResponseRecord,
} from "../types";
import useLocalStorage from "../hooks/useLocalStorage";
import EmotionSelector from "./EmotionSelector";
// useNavigate is still imported but not directly used for the primary navigation after submit due to blob URL issues.
// It's good practice to keep it if other navigation aspects might use it or if the blob issue is resolved/circumvented differently later.
import { useNavigate } from "react-router-dom";

const ThoughtForm: React.FC = () => {
  // const navigate = useNavigate(); // Kept for potential future use or other navigation needs
  const [entries, setEntries] = useLocalStorage<DysfunctionalThoughtEntry[]>(
    "dysfunctionalThoughts",
    [],
  );

  // 1. Date
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  // 2. Situation
  const [situation, setSituation] = useState<string>("");
  // 3. Initial Emotions
  const [initialEmotions, setInitialEmotions] = useState<SelectedEmotion[]>([]);
  // 4. Automatic Thoughts
  const [automaticThoughts, setAutomaticThoughts] = useState<ThoughtRecord[]>(
    [],
  );
  const [newThoughtText, setNewThoughtText] = useState<string>("");
  const [newThoughtConviction, setNewThoughtConviction] = useState<number>(75);
  // 5. Alternative Responses
  const [alternativeResponses, setAlternativeResponses] = useState<
    AlternativeResponseRecord[]
  >([]);
  const [newAlternativeText, setNewAlternativeText] = useState<string>("");
  const [newAlternativeBelief, setNewAlternativeBelief] = useState<number>(50);
  // 6. Reassessment
  const [reassessmentCurrentEmotions, setReassessmentCurrentEmotions] =
    useState<SelectedEmotion[]>([]);
  const [reassessmentActionPlan, setReassessmentActionPlan] =
    useState<string>("");

  // Memoized handlers for simple input fields
  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value),
    [],
  );
  const handleSituationChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setSituation(e.target.value),
    [],
  );
  const handleNewThoughtTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setNewThoughtText(e.target.value),
    [],
  );
  const handleNewThoughtConvictionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setNewThoughtConviction(Number(e.target.value)),
    [],
  );
  const handleNewAlternativeTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setNewAlternativeText(e.target.value),
    [],
  );
  const handleNewAlternativeBeliefChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setNewAlternativeBelief(Number(e.target.value)),
    [],
  );
  const handleReassessmentActionPlanChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setReassessmentActionPlan(e.target.value),
    [],
  );

  const handleAddAutomaticThought = useCallback(() => {
    if (newThoughtText.trim() === "") return;
    setAutomaticThoughts((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: newThoughtText,
        conviction: newThoughtConviction,
      },
    ]);
    setNewThoughtText("");
    setNewThoughtConviction(75);
  }, [newThoughtText, newThoughtConviction]);

  const handleRemoveAutomaticThought = useCallback((id: string) => {
    setAutomaticThoughts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleAutomaticThoughtConvictionChange = useCallback(
    (id: string, conviction: number) => {
      setAutomaticThoughts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, conviction } : t)),
      );
    },
    [],
  );

  const handleAddAlternativeResponse = useCallback(() => {
    if (newAlternativeText.trim() === "") return;
    setAlternativeResponses((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: newAlternativeText,
        belief: newAlternativeBelief,
      },
    ]);
    setNewAlternativeText("");
    setNewAlternativeBelief(50);
  }, [newAlternativeText, newAlternativeBelief]);

  const handleRemoveAlternativeResponse = useCallback((id: string) => {
    setAlternativeResponses((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const handleAlternativeResponseBeliefChange = useCallback(
    (id: string, belief: number) => {
      setAlternativeResponses((prev) =>
        prev.map((r) => (r.id === id ? { ...r, belief } : r)),
      );
    },
    [],
  );

  const handleReassessmentThoughtConvictionChange = useCallback(
    (id: string, conviction: number) => {
      // This updates the original automaticThoughts list for re-evaluation
      setAutomaticThoughts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, conviction } : t)),
      );
    },
    [],
  );

  const resetForm = () => {
    setDate(new Date().toISOString().split("T")[0]);
    setSituation("");
    setInitialEmotions([]);
    setAutomaticThoughts([]);
    setNewThoughtText("");
    setNewThoughtConviction(75);
    setAlternativeResponses([]);
    setNewAlternativeText("");
    setNewAlternativeBelief(50);
    setReassessmentCurrentEmotions([]);
    setReassessmentActionPlan("");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newEntry: DysfunctionalThoughtEntry = {
      id: Date.now().toString(),
      date,
      situation,
      initialEmotions: [...initialEmotions], // Ensure a copy for initial emotions too
      automaticThoughts: automaticThoughts.map((t) => ({ ...t })),
      alternativeResponses: alternativeResponses.map((r) => ({ ...r })), // Ensure copies here too
      reassessment: {
        reEvaluatedThoughts: automaticThoughts.map((t) => ({ ...t })),
        currentEmotions: [...reassessmentCurrentEmotions], // Ensure a copy of the array is used
        actionPlan: reassessmentActionPlan,
      },
    };
    setEntries((prevEntries) => [...prevEntries, newEntry]);
    resetForm();

    // Programmatic navigation workaround for blob: URL issues
    // Using setTimeout to allow React state updates to process before navigation
    setTimeout(() => {
      const anchor = document.createElement("a");
      anchor.href = "#/history"; // Navigate to hash route
      document.body.appendChild(anchor); // Anchor needs to be in the document to be "clickable"
      anchor.click();
      document.body.removeChild(anchor); // Clean up
    }, 0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-6 sm:p-8 md:p-10 shadow-xl rounded-lg"
    >
      <h1 className="text-3xl font-bold text-sky-700 mb-8 text-center">
        Registro de Pensamento Disfuncional
      </h1>

      {/* 1. Data */}
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          1. Data da Ocorrência:
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
        />
      </div>

      {/* 2. Situação */}
      <div>
        <label
          htmlFor="situation"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          2. Descrição da Situação:
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Local, momento, com quem estava, o que fazia, o que falavam, etc.
        </p>
        <textarea
          id="situation"
          value={situation}
          onChange={handleSituationChange}
          rows={4}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm resize-vertical"
        ></textarea>
      </div>

      {/* 3. Emoções Iniciais */}
      <EmotionSelector
        idPrefix="initial"
        label="3. Emoções, Sentimentos ou Sensações Iniciais (Intensidade 0-100):"
        selectedEmotions={initialEmotions}
        onChange={setInitialEmotions}
      />

      {/* 4. Pensamentos Automáticos */}
      <div className="space-y-4 p-4 border border-gray-200 rounded-md bg-gray-50">
        <h3 className="text-md font-semibold text-gray-800">
          4. Pensamentos Automáticos (Convicção 0-100):
        </h3>
        <div className="space-y-2">
          {automaticThoughts.map((thought) => (
            <div
              key={thought.id}
              className="p-3 bg-white border border-gray-300 rounded-md shadow-sm"
            >
              <p className="text-gray-700 mb-2 whitespace-pre-wrap">
                {thought.text}
              </p>
              <div className="flex items-center justify-between">
                <label
                  htmlFor={`thought-${thought.id}-conviction`}
                  className="text-sm text-gray-600"
                >
                  Convicção:
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    id={`thought-${thought.id}-conviction`}
                    min="0"
                    max="100"
                    value={thought.conviction}
                    onChange={(e) =>
                      handleAutomaticThoughtConvictionChange(
                        thought.id,
                        Number(e.target.value),
                      )
                    }
                    className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                  <span className="text-sm text-gray-600 w-8 text-right">
                    {thought.conviction}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAutomaticThought(thought.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    &times;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-3 p-3 border-t border-gray-200">
          <label
            htmlFor="newThoughtText"
            className="block text-sm font-medium text-gray-700"
          >
            Adicionar novo pensamento:
          </label>
          <textarea
            id="newThoughtText"
            value={newThoughtText}
            onChange={handleNewThoughtTextChange}
            rows={2}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm resize-vertical"
          ></textarea>
          <div className="flex items-center space-x-3">
            <label
              htmlFor="newThoughtConviction"
              className="text-sm text-gray-600"
            >
              Convicção:
            </label>
            <input
              type="range"
              id="newThoughtConviction"
              min="0"
              max="100"
              value={newThoughtConviction}
              onChange={handleNewThoughtConvictionChange}
              className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <span className="text-sm text-gray-600 w-8 text-right">
              {newThoughtConviction}
            </span>
          </div>
          <button
            type="button"
            onClick={handleAddAutomaticThought}
            className="mt-2 px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm"
          >
            Adicionar Pensamento
          </button>
        </div>
      </div>

      {/* 5. Respostas Alternativas */}
      <div className="space-y-4 p-4 border border-gray-200 rounded-md bg-gray-50">
        <h3 className="text-md font-semibold text-gray-800">
          5. Respostas Alternativas (Crença 0-100):
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          Reflita: Que provas tenho da veracidade de cada pensamento? Qual é a
          pior coisa que pode acontecer? E se eu mudasse o pensamento? O que
          diria a um amigo?
        </p>
        <div className="space-y-2">
          {alternativeResponses.map((response) => (
            <div
              key={response.id}
              className="p-3 bg-white border border-gray-300 rounded-md shadow-sm"
            >
              <p className="text-gray-700 mb-2 whitespace-pre-wrap">
                {response.text}
              </p>
              <div className="flex items-center justify-between">
                <label
                  htmlFor={`response-${response.id}-belief`}
                  className="text-sm text-gray-600"
                >
                  Crença na resposta:
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    id={`response-${response.id}-belief`}
                    min="0"
                    max="100"
                    value={response.belief}
                    onChange={(e) =>
                      handleAlternativeResponseBeliefChange(
                        response.id,
                        Number(e.target.value),
                      )
                    }
                    className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                  <span className="text-sm text-gray-600 w-8 text-right">
                    {response.belief}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAlternativeResponse(response.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    &times;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-3 p-3 border-t border-gray-200">
          <label
            htmlFor="newAlternativeText"
            className="block text-sm font-medium text-gray-700"
          >
            Adicionar nova resposta alternativa:
          </label>
          <textarea
            id="newAlternativeText"
            value={newAlternativeText}
            onChange={handleNewAlternativeTextChange}
            rows={2}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm resize-vertical"
          ></textarea>
          <div className="flex items-center space-x-3">
            <label
              htmlFor="newAlternativeBelief"
              className="text-sm text-gray-600"
            >
              Crença na resposta:
            </label>
            <input
              type="range"
              id="newAlternativeBelief"
              min="0"
              max="100"
              value={newAlternativeBelief}
              onChange={handleNewAlternativeBeliefChange}
              className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <span className="text-sm text-gray-600 w-8 text-right">
              {newAlternativeBelief}
            </span>
          </div>
          <button
            type="button"
            onClick={handleAddAlternativeResponse}
            className="mt-2 px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm"
          >
            Adicionar Resposta
          </button>
        </div>
      </div>

      {/* 6. Reavaliação */}
      <div className="space-y-6 p-4 border-2 border-sky-200 rounded-lg bg-sky-50 shadow">
        <h3 className="text-xl font-semibold text-sky-700 text-center">
          6. Reavaliação Final
        </h3>

        {/* Reavaliar Pensamentos Automáticos */}
        {automaticThoughts.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-md font-medium text-gray-800">
              Reavalie a convicção em cada pensamento automático (0-100):
            </h4>
            {automaticThoughts.map((thought) => (
              <div
                key={`reval-${thought.id}`}
                className="p-3 bg-white border border-gray-300 rounded-md"
              >
                <p className="text-gray-700 mb-2 whitespace-pre-wrap">
                  {thought.text}
                </p>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={`reval-thought-${thought.id}-conviction`}
                    className="text-sm text-gray-600"
                  >
                    Nova Convicção:
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      id={`reval-thought-${thought.id}-conviction`}
                      min="0"
                      max="100"
                      value={thought.conviction}
                      onChange={(e) =>
                        handleReassessmentThoughtConvictionChange(
                          thought.id,
                          Number(e.target.value),
                        )
                      }
                      className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                    />
                    <span className="text-sm text-gray-600 w-8 text-right">
                      {thought.conviction}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Emoções Atuais */}
        <EmotionSelector
          idPrefix="reassessment"
          label="Quais emoções você sente agora? (Intensidade 0-100):"
          selectedEmotions={reassessmentCurrentEmotions}
          onChange={setReassessmentCurrentEmotions}
        />

        {/* Plano de Ação */}
        <div>
          <label
            htmlFor="actionPlan"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            O que pode ser feito agora diante da situação?
          </label>
          <textarea
            id="actionPlan"
            value={reassessmentActionPlan}
            onChange={handleReassessmentActionPlanChange}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm resize-vertical"
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-8 px-6 py-3 text-lg font-semibold text-white bg-green-600 hover:bg-green-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
      >
        Salvar Registro
      </button>
    </form>
  );
};

export default ThoughtForm;
