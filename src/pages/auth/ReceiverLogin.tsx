import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Heart, Mail, Lock, ArrowLeft } from 'lucide-react';

export default function ReceiverLogin() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { loginAsReceiver, receivers, showToast } = useApp();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const receiver = receivers.find(r => r.email === email);
    if (receiver) {
      loginAsReceiver(receiver.id);
      showToast('Login successful!', 'success');
      navigate('/receiver/dashboard');
    } else {
      showToast('Receiver not found. Try: littlestars@example.com', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Link to="/" className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Receiver Login</h2>
              <p className="text-sm text-gray-600">For Organizations</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter organization email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-600 mb-3">Demo Receivers (click to auto-fill):</p>
            <div className="space-y-2">
              {receivers.map(receiver => (
                <button
                  key={receiver.id}
                  onClick={() => setEmail(receiver.email)}
                  className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-sm"
                >
                  <div className="font-medium">{receiver.orgName}</div>
                  <div className="text-gray-600">{receiver.email}</div>
                  <div className="text-xs text-green-600 mt-1">
                    {receiver.orgType.charAt(0).toUpperCase() + receiver.orgType.slice(1)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
