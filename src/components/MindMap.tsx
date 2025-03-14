import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useStore } from '../store/useStore';
import { useAuth } from '../hooks/useAuth';
import { Layout, FileText } from 'lucide-react';

export function MindMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { templates } = useStore();
  const { isAuthenticated } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });
  }, []);

  useEffect(() => {
    if (!selectedTemplate) return;

    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return;

    const generateMindMap = async () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        const element = document.createElement('div');
        element.innerHTML = template.structure;
        containerRef.current.appendChild(element);
        await mermaid.run();
      }
    };

    generateMindMap();
  }, [selectedTemplate, templates]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to create mind maps.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {!selectedTemplate ? (
        <div className="grid md:grid-cols-2 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <Layout className="h-6 w-6 text-indigo-600" />
                <h3 className="text-xl font-semibold">{template.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <button
                className="flex items-center text-indigo-600 hover:text-indigo-700"
              >
                <FileText className="h-4 w-4 mr-2" />
                Use Template
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {templates.find(t => t.id === selectedTemplate)?.name}
            </h2>
            <button
              onClick={() => setSelectedTemplate(null)}
              className="text-gray-600 hover:text-gray-800"
            >
              Choose Another Template
            </button>
          </div>
          <div ref={containerRef} className="w-full overflow-x-auto" />
          <div className="mt-4 text-center text-gray-500">
            <p>Drag and drop functionality coming soon!</p>
          </div>
        </div>
      )}
    </div>
  );
}