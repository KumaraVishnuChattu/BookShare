import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Bell, BookOpen, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
  role: 'user' | 'receiver' | 'admin';
}

export default function Layout({ children, role }: LayoutProps) {
  const { currentUser, currentReceiver, logout, notifications } = useApp();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userLinks = [
    { to: '/user/dashboard', label: 'Dashboard' },
    { to: '/user/browse', label: 'Browse Books' },
    { to: '/user/upload', label: 'Post Book' },
    { to: '/user/my-books', label: 'My Books' },
    { to: '/user/requests', label: 'My Requests' },
    { to: '/user/pins', label: 'Wishlist' },
    { to: '/donate/map', label: 'Donate' },
    { to: '/donate/requests', label: 'Donation Requests' },
    { to: '/user/profile', label: 'Profile' }
  ];

  const receiverLinks = [
    { to: '/receiver/dashboard', label: 'Dashboard' },
    { to: '/receiver/upload-id', label: 'Upload ID' },
    { to: '/receiver/needs', label: 'Required Books' },
    { to: '/receiver/donations', label: 'Donations' },
    { to: '/receiver/pickups', label: 'Pickups' },
    { to: '/receiver/map', label: 'Map View' },
    { to: '/receiver/profile', label: 'Profile' }
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/verify-receivers', label: 'Verify Receivers' },
    { to: '/admin/complaints', label: 'Complaints' },
    { to: '/admin/malpractice', label: 'Malpractice' },
    { to: '/admin/users', label: 'All Users' },
    { to: '/admin/books', label: 'All Books' },
    { to: '/admin/donations', label: 'Donations' },
    { to: '/admin/exchanges', label: 'Exchanges' }
  ];

  const links = role === 'user' ? userLinks : role === 'receiver' ? receiverLinks : adminLinks;
  const bgColor = role === 'user' ? 'bg-blue-600' : role === 'receiver' ? 'bg-green-600' : 'bg-gray-800';
  const name = role === 'user' ? currentUser?.name : role === 'receiver' ? currentReceiver?.orgName : 'Admin';

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className={`${bgColor} text-white shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8" />
              <span className="text-xl font-bold">BookShare</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <span className="text-sm">Welcome, {name}</span>
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 hover:bg-white/10 rounded-lg transition"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    {notifications.length === 0 ? (
                      <p className="p-4 text-sm text-gray-500">No notifications</p>
                    ) : (
                      notifications.slice(0, 10).map(n => (
                        <div key={n.id} className={`p-4 border-b hover:bg-gray-50 ${!n.read ? 'bg-blue-50' : ''}`}>
                          <p className="text-sm">{n.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{new Date(n.date).toLocaleString()}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-lg transition">
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>

            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20">
            <div className="px-4 py-2 space-y-1">
              {links.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-3 py-2 hover:bg-white/10 rounded-lg transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      <div className="flex max-w-7xl mx-auto">
        <aside className="hidden md:block w-64 bg-white border-r min-h-[calc(100vh-4rem)] p-4">
          <nav className="space-y-1">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-2 rounded-lg hover:bg-gray-100 transition ${
                  window.location.pathname === link.to ? 'bg-gray-100 font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
