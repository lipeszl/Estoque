// src/app/page.js
import React from 'react';

const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-5 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Projeto Estoque</h1>
        <p className="text-lg mb-4">Este é um sistema para gerenciar seu estoque de produtos.</p>
        <p className="text-md mb-4">Tecnologias utilizadas neste projeto:</p>
        <ul className="list-disc list-inside mb-4">
          <li>React</li>
          <li>Next.js</li>
          <li>Bootstrap</li>
          <li>Tailwind CSS</li>
          <li>Sequelize</li>
          <li>MySQL</li>
        </ul>
        <p>
          <a href="/login" className="text-blue-500 hover:underline">Clique aqui para fazer login</a>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
