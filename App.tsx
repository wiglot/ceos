import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import AboutMethodPage from './pages/AboutMethodPage';
import WelcomeModal from './components/WelcomeModal';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <WelcomeModal />
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/about-method" element={<AboutMethodPage />} />
        </Routes>
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} Céos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
