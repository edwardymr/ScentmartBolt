import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { QuizAnswers } from '../../types';
import { geminiService } from '../../services/geminiService';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (recommendations: string[]) => void;
}

const questions = [
  {
    id: 'occasion',
    question: '¿Para qué ocasión buscas tu fragancia ideal?',
    options: [
      { value: 'daily', label: 'Uso diario y trabajo' },
      { value: 'romantic', label: 'Citas románticas' },
      { value: 'special', label: 'Eventos especiales' },
      { value: 'evening', label: 'Noches de fiesta' }
    ]
  },
  {
    id: 'personality',
    question: '¿Cómo describirías tu personalidad?',
    options: [
      { value: 'elegant', label: 'Elegante y sofisticada' },
      { value: 'adventurous', label: 'Aventurera y espontánea' },
      { value: 'classic', label: 'Clásica y atemporal' },
      { value: 'bold', label: 'Audaz y moderna' }
    ]
  },
  {
    id: 'preferences',
    question: '¿Qué tipo de aromas te atraen más?',
    options: [
      { value: 'fresh', label: 'Frescos y ligeros' },
      { value: 'sweet', label: 'Dulces y envolventes' },
      { value: 'intense', label: 'Intensos y duraderos' },
      { value: 'natural', label: 'Naturales y orgánicos' }
    ]
  }
];

export default function QuizModal({ isOpen, onClose, onComplete }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleAnswerSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    if (Object.keys(answers).length === questions.length) {
      setIsLoading(true);
      try {
        const recommendations = await geminiService.findMyScent(answers as QuizAnswers);
        onComplete(recommendations);
        onClose();
      } catch (error) {
        console.error('Error getting recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const currentQ = questions[currentQuestion];
  const selectedAnswer = answers[currentQ.id as keyof QuizAnswers];
  const canProceed = selectedAnswer !== undefined;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-serif font-bold text-slate-800">
              Descubre tu Aroma Ideal
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Pregunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">
            {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswerSelect(currentQ.id, option.value)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  selectedAnswer === option.value
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === option.value
                      ? 'border-orange-500 bg-orange-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="font-medium">{option.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Action Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!canProceed || isLoading}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analizando...
                </>
              ) : currentQuestion === questions.length - 1 ? (
                <>
                  <Sparkles className="w-5 h-5" />
                  Encontrar mi aroma
                </>
              ) : (
                <>
                  Siguiente
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}