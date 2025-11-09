import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { Users, BookOpen, Shield, AlertCircle, Heart, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const { users, books, receivers, complaints, donations, requests } = useApp();

  const pendingVerifications = receivers.filter(r => r.verificationStatus === 'pending').length;
  const openComplaints = complaints.filter(c => c.status === 'open').length;
  const completedDonations = donations.filter(d => d.status === 'completed').length;
  const totalExchanges = requests.filter(r => r.status === 'completed').length;

  return (
    <Layout role="admin">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <Users className="w-10 h-10 text-blue-500 mb-3" />
            <p className="text-3xl font-bold text-gray-800 mb-1">{users.length}</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <BookOpen className="w-10 h-10 text-green-500 mb-3" />
            <p className="text-3xl font-bold text-gray-800 mb-1">{books.filter(b => b.status !== 'deleted').length}</p>
            <p className="text-sm text-gray-600">Total Books</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <Shield className="w-10 h-10 text-orange-500 mb-3" />
            <p className="text-3xl font-bold text-gray-800 mb-1">{pendingVerifications}</p>
            <p className="text-sm text-gray-600">Pending Verifications</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
            <p className="text-3xl font-bold text-gray-800 mb-1">{openComplaints}</p>
            <p className="text-sm text-gray-600">Open Complaints</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <Heart className="w-10 h-10 text-pink-500 mb-3" />
            <p className="text-3xl font-bold text-gray-800 mb-1">{completedDonations}</p>
            <p className="text-sm text-gray-600">Donations Completed</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <RefreshCw className="w-10 h-10 text-indigo-500 mb-3" />
            <p className="text-3xl font-bold text-gray-800 mb-1">{totalExchanges}</p>
            <p className="text-sm text-gray-600">Exchanges Completed</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/admin/verify-receivers" className="bg-white p-6 rounded-xl shadow-sm border-2 border-gray-200 hover:border-orange-500 transition">
            <div className="flex items-center gap-4 mb-3">
              <Shield className="w-8 h-8 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-800">Verify Receivers</h3>
            </div>
            <p className="text-gray-600">{pendingVerifications} organizations awaiting verification</p>
          </Link>

          <Link to="/admin/complaints" className="bg-white p-6 rounded-xl shadow-sm border-2 border-gray-200 hover:border-red-500 transition">
            <div className="flex items-center gap-4 mb-3">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-800">Complaints</h3>
            </div>
            <p className="text-gray-600">{openComplaints} complaints need attention</p>
          </Link>

          <Link to="/admin/users" className="bg-white p-6 rounded-xl shadow-sm border-2 border-gray-200 hover:border-blue-500 transition">
            <div className="flex items-center gap-4 mb-3">
              <Users className="w-8 h-8 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-800">All Users</h3>
            </div>
            <p className="text-gray-600">Manage {users.length} registered users</p>
          </Link>

          <Link to="/admin/books" className="bg-white p-6 rounded-xl shadow-sm border-2 border-gray-200 hover:border-green-500 transition">
            <div className="flex items-center gap-4 mb-3">
              <BookOpen className="w-8 h-8 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-800">All Books</h3>
            </div>
            <p className="text-gray-600">Monitor {books.filter(b => b.status !== 'deleted').length} book listings</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
