import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { ChatInterface } from './components/ChatInterface';
import { MindMap } from './components/MindMap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="chat" element={<ChatInterface />} />
          <Route path="mindmap" element={<MindMap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;