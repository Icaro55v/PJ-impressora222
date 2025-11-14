import React from 'react';
import { PrintOrder, Status } from '../types';
import OrderItem from './OrderItem';
import { SortIcon } from './icons';

interface OrderListProps {
  orders: PrintOrder[];
  onUpdateStatus: (id: string, status: Status) => void;
  sortBy: string;
  setSortBy: (value: 'createdAt' | 'status') => void;
  isAdmin: boolean;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onUpdateStatus, sortBy, setSortBy, isAdmin }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Fila de Impressão</h2>
        <div className="flex items-center space-x-2">
            <SortIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ordenar por:</span>
            <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'createdAt' | 'status')}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-1.5"
            >
                <option value="createdAt">Mais Recente</option>
                <option value="status">Status</option>
            </select>
        </div>
      </div>
      
      {orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">Nenhum pedido na fila. Adicione um novo pedido para começar.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <OrderItem key={order.id} order={order} onUpdateStatus={onUpdateStatus} isAdmin={isAdmin} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;