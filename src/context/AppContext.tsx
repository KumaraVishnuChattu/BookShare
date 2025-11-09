import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {
  User,
  Book,
  Receiver,
  Request,
  Donation,
  Complaint,
  AdminLog,
  demoUsers,
  demoBooks,
  demoReceivers,
  demoRequests,
  demoDonations,
  demoComplaints,
  demoAdminLogs
} from '../data/demoData';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  read: boolean;
}

interface AppContextType {
  currentUser: User | null;
  currentReceiver: Receiver | null;
  isAdmin: boolean;
  users: User[];
  books: Book[];
  receivers: Receiver[];
  requests: Request[];
  donations: Donation[];
  complaints: Complaint[];
  adminLogs: AdminLog[];
  notifications: Notification[];
  pinnedBooks: string[];
  loginAsUser: (userId: string) => void;
  loginAsReceiver: (receiverId: string) => void;
  loginAsAdmin: () => void;
  logout: () => void;
  addBook: (book: Book) => void;
  updateBook: (bookId: string, updates: Partial<Book>) => void;
  deleteBook: (bookId: string) => void;
  addRequest: (request: Request) => void;
  updateRequest: (requestId: string, updates: Partial<Request>) => void;
  addDonation: (donation: Donation) => void;
  updateDonation: (donationId: string, updates: Partial<Donation>) => void;
  addComplaint: (complaint: Complaint) => void;
  updateComplaint: (complaintId: string, updates: Partial<Complaint>) => void;
  updateReceiver: (receiverId: string, updates: Partial<Receiver>) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  addAdminLog: (log: AdminLog) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'date' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  togglePinBook: (bookId: string) => void;
  showToast: (message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentReceiver, setCurrentReceiver] = useState<Receiver | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<User[]>(demoUsers);
  const [books, setBooks] = useState<Book[]>(demoBooks);
  const [receivers, setReceivers] = useState<Receiver[]>(demoReceivers);
  const [requests, setRequests] = useState<Request[]>(demoRequests);
  const [donations, setDonations] = useState<Donation[]>(demoDonations);
  const [complaints, setComplaints] = useState<Complaint[]>(demoComplaints);
  const [adminLogs, setAdminLogs] = useState<AdminLog[]>(demoAdminLogs);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [pinnedBooks, setPinnedBooks] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const loginAsUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      setCurrentReceiver(null);
      setIsAdmin(false);
    }
  };

  const loginAsReceiver = (receiverId: string) => {
    const receiver = receivers.find(r => r.id === receiverId);
    if (receiver) {
      setCurrentReceiver(receiver);
      setCurrentUser(null);
      setIsAdmin(false);
    }
  };

  const loginAsAdmin = () => {
    setIsAdmin(true);
    setCurrentUser(null);
    setCurrentReceiver(null);
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentReceiver(null);
    setIsAdmin(false);
  };

  const addBook = (book: Book) => {
    setBooks(prev => [...prev, book]);
  };

  const updateBook = (bookId: string, updates: Partial<Book>) => {
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, ...updates } : b));
  };

  const deleteBook = (bookId: string) => {
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, status: 'deleted' as const } : b));
  };

  const addRequest = (request: Request) => {
    setRequests(prev => [...prev, request]);
  };

  const updateRequest = (requestId: string, updates: Partial<Request>) => {
    setRequests(prev => prev.map(r => r.id === requestId ? { ...r, ...updates } : r));
  };

  const addDonation = (donation: Donation) => {
    setDonations(prev => [...prev, donation]);
  };

  const updateDonation = (donationId: string, updates: Partial<Donation>) => {
    setDonations(prev => prev.map(d => d.id === donationId ? { ...d, ...updates } : d));
  };

  const addComplaint = (complaint: Complaint) => {
    setComplaints(prev => [...prev, complaint]);
  };

  const updateComplaint = (complaintId: string, updates: Partial<Complaint>) => {
    setComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, ...updates } : c));
  };

  const updateReceiver = (receiverId: string, updates: Partial<Receiver>) => {
    setReceivers(prev => prev.map(r => r.id === receiverId ? { ...r, ...updates } : r));
    if (currentReceiver && currentReceiver.id === receiverId) {
      setCurrentReceiver(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const addAdminLog = (log: AdminLog) => {
    setAdminLogs(prev => [...prev, log]);
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'date' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      date: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const togglePinBook = (bookId: string) => {
    setPinnedBooks(prev => {
      if (prev.includes(bookId)) {
        return prev.filter(id => id !== bookId);
      } else {
        return [...prev, bookId];
      }
    });
  };

  const showToast = (message: string, type: 'info' | 'success' | 'warning' | 'error') => {
    setToastMessage({ message, type });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentReceiver,
        isAdmin,
        users,
        books,
        receivers,
        requests,
        donations,
        complaints,
        adminLogs,
        notifications,
        pinnedBooks,
        loginAsUser,
        loginAsReceiver,
        loginAsAdmin,
        logout,
        addBook,
        updateBook,
        deleteBook,
        addRequest,
        updateRequest,
        addDonation,
        updateDonation,
        addComplaint,
        updateComplaint,
        updateReceiver,
        updateUser,
        addAdminLog,
        addNotification,
        markNotificationRead,
        togglePinBook,
        showToast
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg ${
              toastMessage.type === 'success'
                ? 'bg-green-500 text-white'
                : toastMessage.type === 'error'
                ? 'bg-red-500 text-white'
                : toastMessage.type === 'warning'
                ? 'bg-orange-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            {toastMessage.message}
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
