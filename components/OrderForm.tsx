import React, { useState } from 'react';
import { PrintOrder, Area, Part, PartOptions } from '../types';
import { PlusIcon } from './icons';

interface OrderFormProps {
  onAddOrder: (orderData: Omit<PrintOrder, 'id' | 'status' | 'createdAt' | 'userId' | 'userEmail'>) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onAddOrder }) => {
  const [nameAndRegistration, setNameAndRegistration] = useState('');
  const [area, setArea] = useState<Area>(Area.Envase);
  const [email, setEmail] = useState('');
  const [part, setPart] = useState<Part>(PartOptions[0]);
  const [otherPartDescription, setOtherPartDescription] = useState('');
  const [manufacturerCode, setManufacturerCode] = useState('');
  const [equipment, setEquipment] = useState('');
  const [error, setError] = useState('');

  const resetForm = () => {
    setNameAndRegistration('');
    setArea(Area.Envase);
    setEmail('');
    setPart(PartOptions[0]);
    setOtherPartDescription('');
    setManufacturerCode('');
    setEquipment('');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAndRegistration || !email || !manufacturerCode || !equipment || (part === 'Outra' && !otherPartDescription)) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Simple email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Por favor, insira um e-mail válido.');
        return;
    }

    onAddOrder({
      nameAndRegistration,
      area,
      email,
      part,
      otherPartDescription: part === 'Outra' ? otherPartDescription : undefined,
      manufacturerCode,
      equipment,
    });
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 sticky top-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Adicionar Novo Pedido</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome e Matrícula</label>
        <input type="text" id="name" value={nameAndRegistration} onChange={e => setNameAndRegistration(e.target.value)} className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2" required />
      </div>

      <div>
        <label htmlFor="area" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Área</label>
        <select id="area" value={area} onChange={e => setArea(e.target.value as Area)} className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2">
          {Object.values(Area).map(areaValue => <option key={areaValue} value={areaValue}>{areaValue}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">E-mail para Contato</label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2" required />
      </div>

      <div>
        <label htmlFor="part" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Peça de Interesse</label>
        <select id="part" value={part} onChange={e => setPart(e.target.value as Part)} className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2">
          {PartOptions.map(partOption => <option key={partOption} value={partOption}>{partOption}</option>)}
        </select>
      </div>

      {part === 'Outra' && (
        <div>
          <label htmlFor="otherPart" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descreva sua peça</label>
          <input type="text" id="otherPart" value={otherPartDescription} onChange={e => setOtherPartDescription(e.target.value)} className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2" required />
        </div>
      )}

      <div>
        <label htmlFor="manufacturerCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Código do Fabricante</label>
        <input type="text" id="manufacturerCode" value={manufacturerCode} onChange={e => setManufacturerCode(e.target.value)} className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2" required />
      </div>

      <div>
        <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Equipamento</label>
        <input type="text" id="equipment" value={equipment} onChange={e => setEquipment(e.target.value)} className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2" required />
      </div>

      <button type="submit" className="w-full inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
        <PlusIcon className="h-5 w-5 mr-2" />
        Adicionar Pedido
      </button>
    </form>
  );
};

export default OrderForm;