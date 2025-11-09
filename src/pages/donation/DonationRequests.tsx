import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { Heart } from 'lucide-react';

export default function DonationRequests() {
  const { currentUser, donations, books, receivers } = useApp();

  if (!currentUser) return null;

  const myDonations = donations.filter(d => d.donorId === currentUser.id);

  return (
    <Layout role="user">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Donation Requests</h1>

      {myDonations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No donations yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myDonations.map(don => {
            const book = books.find(b => b.id === don.bookId);
            const receiver = receivers.find(r => r.id === don.receiverId);

            return (
              <div key={don.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{book?.title}</h3>
                    <p className="text-sm text-gray-600">{book?.category}</p>
                    <p className="text-sm text-gray-700 mt-2">To: {receiver?.orgName}</p>
                    <p className="text-xs text-gray-500">{receiver?.orgType.toUpperCase()}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    don.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    don.status === 'accepted' ? 'bg-green-100 text-green-700' :
                    don.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {don.status.charAt(0).toUpperCase() + don.status.slice(1)}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>Requested: {new Date(don.date).toLocaleDateString()}</p>
                  {don.pickupRequested && (
                    <p className="text-green-600">Pickup requested</p>
                  )}
                  {don.pickupScheduled && don.pickupDetails && (
                    <p className="text-blue-600">{don.pickupDetails}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
