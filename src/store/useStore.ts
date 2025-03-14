import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage, BrainstormSession, MindMapTemplate } from '../types';

interface Store {
  currentSession: BrainstormSession | null;
  sessions: BrainstormSession[];
  templates: MindMapTemplate[];
  addMessage: (message: ChatMessage) => void;
  createSession: (topic: string) => void;
  setCurrentSession: (sessionId: string) => void;
}

const DEFAULT_TEMPLATES: MindMapTemplate[] = [
  {
    id: 'project-planning',
    name: 'Project Planning',
    description: 'Structure your project ideas and tasks',
    structure: `
      graph TD
        A[Project Goal] --> B[Requirements]
        A --> C[Timeline]
        A --> D[Resources]
        B --> E[Feature 1]
        B --> F[Feature 2]
    `
  },
  {
    id: 'brainstorming',
    name: 'Brainstorming',
    description: 'Open-ended idea exploration',
    structure: `
      graph TD
        A[Main Idea] --> B[Branch 1]
        A --> C[Branch 2]
        A --> D[Branch 3]
        B --> E[Detail 1]
        C --> F[Detail 2]
    `
  }
];

export const useStore = create<Store>()(
  persist(
    (set) => ({
      currentSession: null,
      sessions: [],
      templates: DEFAULT_TEMPLATES,
      addMessage: (message) =>
        set((state) => {
          if (!state.currentSession) return state;
          const updatedSession = {
            ...state.currentSession,
            messages: [...state.currentSession.messages, message],
            updatedAt: Date.now()
          };
          const updatedSessions = state.sessions.map(session =>
            session.id === updatedSession.id ? updatedSession : session
          );
          return {
            currentSession: updatedSession,
            sessions: updatedSessions
          };
        }),
      createSession: (topic) =>
        set((state) => {
          const newSession: BrainstormSession = {
            id: Date.now().toString(),
            topic,
            messages: [],
            createdAt: Date.now(),
            updatedAt: Date.now()
          };
          return {
            currentSession: newSession,
            sessions: [newSession, ...state.sessions]
          };
        }),
      setCurrentSession: (sessionId) =>
        set((state) => ({
          currentSession: state.sessions.find(s => s.id === sessionId) || null
        }))
    }),
    {
      name: 'brainflow-storage'
    }
  )
);