import { MindMapNode } from 'mermaid';

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  category?: string;
}

export interface User {
  displayName: string;
  photoURL: string;
  email: string;
}

export interface BrainstormSession {
  id: string;
  topic: string;
  messages: ChatMessage[];
  mindMap?: MindMapNode;
  createdAt: number;
  updatedAt: number;
}

export interface MindMapTemplate {
  id: string;
  name: string;
  description: string;
  structure: string;
}