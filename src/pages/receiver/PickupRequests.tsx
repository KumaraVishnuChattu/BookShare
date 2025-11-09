import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { Truck } from 'lucide-react';

export default function PickupRequests() {
  const { currentReceiver, donations, books, users } = useApp();

  if (!currentReceiver) return null;

  const pickupRequests = donations.filter(d => d.receiverId === currentReceiver.id && d.pickupRequested);

  return (
    <Layout role="receiver">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Pickup Requests</h1>

      {pickupRequests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No pickup requests</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pickupRequests.map(don => {
            const book = books.find(b => b.id === don.bookId);
            const donor = users.find(u => u.id === don.donorId);

            return (
              <div key={don.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{book?.title}</h3>
                <p className="text-sm text-gray-600 mb-3">Donor: {donor?.name} - {donor?.phone}</p>
                <p className="text-sm text-gray-600 mb-3">Location: {book?.location}</p>
                <span className={`inline-block px-4 py-2 rounded-full text-sm ${
                  don.pickupScheduled ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {don.pickupScheduled ? 'Scheduled' : 'Pending Schedule'}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
