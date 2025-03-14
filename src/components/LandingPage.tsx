import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, FileSpreadsheet, Upload } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
          Transform Your Ideas into Clear Vision
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Brainstorm with AI assistance, create mind maps, and organize your thoughts effectively
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Brain className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">AI Brainstorming</h3>
          <p className="text-gray-600 mb-4">Start a conversation with AI to generate and organize ideas</p>
          <button
            onClick={() => navigate('/chat')}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Start Brainstorming
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <FileSpreadsheet className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Mind Mapping</h3>
          <p className="text-gray-600 mb-4">Choose from templates or create your own mind maps</p>
          <button
            onClick={() => navigate('/mindmap')}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Create Mind Map
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Upload className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">OCR Import</h3>
          <p className="text-gray-600 mb-4">Coming soon: Import text from images to create mind maps</p>
          <button
            disabled
            className="w-full px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Ideas?</h2>
        <p className="text-lg mb-6">Join thousands of users who are already using our platform</p>
        <button
          onClick={() => navigate('/chat')}
          className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100"
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
}