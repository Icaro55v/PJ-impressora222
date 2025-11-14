import React, { useState } from 'react';
import { MockUser } from '../types';
import { PrinterIcon } from './icons';

// Hardcoded users for local authentication
const mockUsers = [
  { uid: '1', email: 'admin@example.com', password: 'adminpassword' },
  { uid: '2', email: 'user@example.com', password: 'userpassword' },
];

interface LoginProps {
  onLoginSuccess: (user: MockUser) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const foundUser = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      onLoginSuccess({ uid: foundUser.uid, email: foundUser.email });
    } else {
      setError('Falha ao fazer login. Verifique seu e-mail e senha.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="flex flex-col items-center mb-6">
            <PrinterIcon className="h-12 w-12 text-emerald-500" />
            <h1 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white text-center">
                Fila de Impressão 3D
            </h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center" role="alert">{error}</div>}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-3"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-3"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Entrar
            </button>
          </div>
        </form>
         <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
            <p><strong>Admin:</strong> admin@example.com / adminpassword</p>
            <p><strong>User:</strong> user@example.com / userpassword</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
