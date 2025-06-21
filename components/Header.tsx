import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  const navLinkClasses = (path: string) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
      location.pathname === path 
        ? 'bg-sky-600 text-white' 
        : 'text-gray-300 hover:bg-sky-700 hover:text-white'
    }`;

  return (
    <header className="bg-sky-800 shadow-lg">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold">
              Diário de Pensamentos
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className={navLinkClasses('/')}>
              Novo Registro
            </Link>
            <Link to="/history" className={navLinkClasses('/history')}>
              Histórico
            </Link>
            <Link to="/about-method" className={navLinkClasses('/about-method')}>
              Sobre o Método
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
