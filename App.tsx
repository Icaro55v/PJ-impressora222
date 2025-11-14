import React, { useState, useEffect, useMemo } from 'react';
import { PrintOrder, Status, MockUser } from './types';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import Login from './components/Login';
import { PrinterIcon, LogoutIcon } from './components/icons';

// Defina o e-mail do administrador aqui
const ADMIN_EMAIL = 'admin@example.com';
const STORAGE_KEY = 'printOrders';

// Helper functions for local storage
const getOrdersFromStorage = (): PrintOrder[] => {
  try {
    const items = window.localStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return [];
  }
};

const saveOrdersToStorage = (orders: PrintOrder[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error("Error writing to localStorage", error);
  }
};


const App: React.FC = () => {
  const [orders, setOrders] = useState<PrintOrder[]>([]);
  const [sortBy, setSortBy] = useState<'createdAt' | 'status'>('createdAt');
  const [user, setUser] = useState<MockUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for logged-in user in sessionStorage on initial load
  useEffect(() => {
    try {
      const loggedInUserJSON = sessionStorage.getItem('loggedInUser');
      if (loggedInUserJSON) {
        const loggedInUser = JSON.parse(loggedInUserJSON);
        setUser(loggedInUser);
        setIsAdmin(loggedInUser.email === ADMIN_EMAIL);
      }
    } catch (error) {
      console.error("Failed to parse user from sessionStorage", error);
      sessionStorage.removeItem('loggedInUser');
    }
    setLoading(false);
  }, []);
  
  // Load orders from localStorage
  useEffect(() => {
    const allOrders = getOrdersFromStorage();
    if (user) {
      if (isAdmin) {
        setOrders(allOrders);
      } else {
        setOrders(allOrders.filter(order => order.userId === user.uid));
      }
    } else {
      setOrders([]);
    }
  }, [user, isAdmin]);

  const handleLoginSuccess = (loggedInUser: MockUser) => {
    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setIsAdmin(loggedInUser.email === ADMIN_EMAIL);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser');
    setUser(null);
    setIsAdmin(false);
  };

  const handleAddOrder = (orderData: Omit<PrintOrder, 'id' | 'status' | 'createdAt' | 'userId' | 'userEmail'>) => {
    if (!user) return;
    
    const newOrder: PrintOrder = {
      ...orderData,
      id: Date.now().toString(), // Simple unique ID
      status: Status.Pendente,
      createdAt: new Date().toISOString(),
      userId: user.uid,
      userEmail: user.email,
    };

    const updatedOrders = [...getOrdersFromStorage(), newOrder];
    saveOrdersToStorage(updatedOrders);
    // Update state to reflect the change immediately
     if (isAdmin) {
        setOrders(updatedOrders);
      } else {
        setOrders(updatedOrders.filter(order => order.userId === user.uid));
      }
  };

  const handleUpdateStatus = (orderId: string, newStatus: Status) => {
    if (!isAdmin) return;
    
    const allOrders = getOrdersFromStorage();
    const updatedOrders = allOrders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    saveOrdersToStorage(updatedOrders);
    setOrders(updatedOrders); // Update state for admin
  };

  const sortedOrders = useMemo(() => {
    const statusOrder: { [key in Status]: number } = {
      [Status.EmAndamento]: 1,
      [Status.Pendente]: 2,
      [Status.Concluido]: 3,
      [Status.Falha]: 4,
    };
    
    return [...orders].sort((a, b) => {
      if (sortBy === 'status') {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [orders, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl dark:text-white">Carregando...</p>
      </div>
    );
  }
  
  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
                <PrinterIcon className="h-8 w-8 text-emerald-500" />
                <h1 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
                    Gerenciador de Fila de Impressão 3D
                </h1>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">{user.email}</span>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  aria-label="Sair da sua conta"
                >
                    <LogoutIcon className="h-5 w-5 mr-2" />
                    Sair
                </button>
            </div>
        </div>
      </header>

      <main className="container mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <OrderForm onAddOrder={handleAddOrder} />
        </div>
        <div className="lg:col-span-2">
          <OrderList 
            orders={sortedOrders} 
            onUpdateStatus={handleUpdateStatus}
            sortBy={sortBy}
            setSortBy={setSortBy}
            isAdmin={isAdmin}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
