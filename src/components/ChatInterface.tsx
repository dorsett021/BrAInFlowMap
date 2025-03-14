import React, { useState } from 'react';
import { Send, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ChatMessage } from '../types';
import { useAuth } from '../hooks/useAuth';

export function ChatInterface() {
  const [input, setInput] = useState('');
  const [topic, setTopic] = useState('');
  const { isAuthenticated } = useAuth();
  const { currentSession, createSession, addMessage } = useStore();

  const handleNewSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    createSession(topic);
    setTopic('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentSession) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: Date.now()
    };

    addMessage(newMessage);
    setInput('');

    // Simulate AI response with categorization
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Let me help you organize those thoughts...',
        role: 'assistant',
        timestamp: Date.now(),
        category: 'analysis'
      };
      addMessage(aiResponse);
    }, 1000);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to use the chat interface.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-lg shadow-sm">
      {!currentSession ? (
        <div className="flex-1 flex items-center justify-center">
          <form onSubmit={handleNewSession} className="w-96">
            <h2 className="text-2xl font-bold text-center mb-6">Start a New Brainstorming Session</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your topic..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Start Session
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">{currentSession.topic}</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentSession.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.content}
                  {message.category && (
                    <div className="text-xs mt-1 opacity-75">
                      Category: {message.category}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}