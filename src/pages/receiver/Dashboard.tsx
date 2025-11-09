import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { Upload, BookOpen, Heart, Truck, MapPin, CheckCircle } from 'lucide-react';

export default function ReceiverDashboard() {
  const { currentReceiver, donations } = useApp();

  if (!currentReceiver) return null;

  const myDonations = donations.filter(d => d.receiverId === currentReceiver.id);
  const pendingDonations = myDonations.filter(d => d.status === 'pending');

  return (
    <Layout role="receiver">
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, {currentReceiver.orgName}!
          </h1>
          <p className="text-gray-600">Manage your organization's book donations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <CheckCircle className="w-10 h-10 text-green-500 mb-3" />
            <p className="text-sm text-gray-600 mb-1">Verification Status</p>
            <p className={`text-lg font-bold ${
              currentReceiver.verified ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {currentReceiver.verified ? 'Verified' : 'Pending'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <Heart className="w-10 h-10 text-red-500 mb-3" />
            <p className="text-sm text-gray-600 mb-1">Books Received</p>
            <p className="text-3xl font-bold text-gray-800">{currentReceiver.receivedCount}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <BookOpen className="w-10 h-10 text-blue-500 mb-3" />
            <p className="text-sm text-gray-600 mb-1">Pending Donations</p>
            <p className="text-3xl font-bold text-gray-800">{pendingDonations.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link to="/receiver/upload-id" className="bg-green-500 text-white p-6 rounded-xl hover:bg-green-600 transition shadow-md">
            <Upload className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Upload ID</h3>
            <p className="text-sm text-green-100">Verify your organization</p>
          </Link>

          <Link to="/receiver/needs" className="bg-blue-500 text-white p-6 rounded-xl hover:bg-blue-600 transition shadow-md">
            <BookOpen className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Required Books</h3>
            <p className="text-sm text-blue-100">Specify what you need</p>
          </Link>

          <Link to="/receiver/donations" className="bg-red-500 text-white p-6 rounded-xl hover:bg-red-600 transition shadow-md">
            <Heart className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Donations</h3>
            <p className="text-sm text-red-100">Manage incoming donations</p>
          </Link>

          {currentReceiver.pickupAvailable && (
            <Link to="/receiver/pickups" className="bg-orange-500 text-white p-6 rounded-xl hover:bg-orange-600 transition shadow-md">
              <Truck className="w-8 h-8 mb-3" />
              <h3 className="font-semibold mb-1">Pickups</h3>
              <p className="text-sm text-orange-100">Manage pickup requests</p>
            </Link>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Books We Need</h3>
          <div className="flex flex-wrap gap-2">
            {currentReceiver.needs.map(need => (
              <span key={need} className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {need}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
