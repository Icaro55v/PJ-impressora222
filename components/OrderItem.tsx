import React from 'react';
import { PrintOrder, Status } from '../types';
import { ChevronDownIcon } from './icons';

interface OrderItemProps {
  order: PrintOrder;
  onUpdateStatus: (id: string, status: Status) => void;
  isAdmin: boolean;
}

const statusColors: { [key in Status]: string } = {
  [Status.Pendente]: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
  [Status.EmAndamento]: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  [Status.Concluido]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  [Status.Falha]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const statusBorderColors: { [key in Status]: string } = {
  [Status.Pendente]: 'border-cyan-500',
  [Status.EmAndamento]: 'border-amber-500',
  [Status.Concluido]: 'border-green-500',
  [Status.Falha]: 'border-red-500',
};

const OrderItem: React.FC<OrderItemProps> = ({ order, onUpdateStatus, isAdmin }) => {
  const partDisplay = order.part === 'Outra' ? order.otherPartDescription : order.part;
  const createdAtDate = order.createdAt ? new Date(order.createdAt) : null;

  return (
    <div className={`p-4 rounded-lg shadow-md border-l-4 ${statusBorderColors[order.status]} bg-gray-50 dark:bg-gray-700 transition-shadow duration-200 hover:shadow-xl`}>
      <div className="flex flex-col sm:flex-row justify-between sm:items-start">
        <div className="flex-1 mb-4 sm:mb-0">
          <p className="font-bold text-lg text-gray-900 dark:text-white">{partDisplay}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Solicitante: {order.nameAndRegistration} ({order.area})</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Equipamento: {order.equipment}</p>
        </div>
        <div className="flex flex-col sm:items-end sm:ml-4 space-y-2">
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>{order.status}</span>
            <p className="text-xs text-gray-400">{createdAtDate ? createdAtDate.toLocaleString() : 'Carregando data...'}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
            Cód. Fabricante: <span className="font-mono">{order.manufacturerCode}</span>
        </div>
        <div className="relative">
          <select
            value={order.status}
            onChange={(e) => onUpdateStatus(order.id, e.target.value as Status)}
            disabled={!isAdmin}
            className={`- H-10 pl-3 pr-8 text-sm font-medium rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${statusColors[order.status]} border border-transparent disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {Object.values(Status).map(statusValue => (
              <option key={statusValue} value={statusValue}>{statusValue}</option>
            ))}
          </select>
          <ChevronDownIcon className="h-5 w-5 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
