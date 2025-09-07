import { GoogleGenerativeAI } from '@google/generative-ai';
import { QuizAnswers } from '../types';
import { perfumes } from '../data/perfumes';

// For demo purposes, we'll use a mock service since we don't have API keys
const MOCK_RECOMMENDATIONS = ['Midnight Garden', 'Rose Velvet', 'Golden Horizon'];

export const geminiService = {
  async findMyScent(answers: QuizAnswers): Promise<string[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, this would call the Gemini API
    const prompt = `
      Basado en las siguientes preferencias del usuario:
      - Ocasión: ${answers.occasion}
      - Personalidad: ${answers.personality}
      - Preferencias: ${answers.preferences}
      
      Y teniendo en cuenta nuestro catálogo de perfumes:
      ${perfumes.map(p => `${p.name} (${p.family}, ${p.gender}): ${p.description.substring(0, 100)}...`).join('\n')}
      
      Recomienda 3 perfumes que mejor se adapten a estas preferencias.
      Responde SOLO con un array JSON de nombres de perfumes.
    `;
    
    console.log('Gemini prompt:', prompt);
    
    // Return mock recommendations for demo
    const availablePerfumes = perfumes.filter(p => p.stock > 0).map(p => p.name);
    const shuffled = [...availablePerfumes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }
};