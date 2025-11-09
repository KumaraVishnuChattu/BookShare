import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { Check, X } from 'lucide-react';

export default function ReceiverDonations() {
  const { currentReceiver, donations, books, users, updateDonation, showToast } = useApp();

  if (!currentReceiver) return null;

  const myDonations = donations.filter(d => d.receiverId === currentReceiver.id);

  const handleAccept = (donationId: string, pickupRequested: boolean) => {
    updateDonation(donationId, { status: 'accepted', pickupScheduled: pickupRequested });
    showToast('Donation accepted!', 'success');
  };

  const handleReject = (donationId: string) => {
    if (window.confirm('Reject this donation?')) {
      updateDonation(donationId, { status: 'rejected' });
      showToast('Donation rejected', 'info');
    }
  };

  return (
    <Layout role="receiver">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Donation Requests</h1>

      {myDonations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-600">No donation requests yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myDonations.map(don => {
            const book = books.find(b => b.id === don.bookId);
            const donor = users.find(u => u.id === don.donorId);

            return (
              <div key={don.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{book?.title}</h3>
                    <p className="text-sm text-gray-600">{book?.category}</p>
                    <p className="text-sm text-gray-700 mt-2">From: {donor?.name}</p>
                    <p className="text-xs text-gray-500">{donor?.city}</p>
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

                <p className="text-sm text-gray-600 mb-4">
                  Requested: {new Date(don.date).toLocaleDateString()}
                  {don.pickupRequested && <span className="ml-2 text-blue-600">• Pickup Requested</span>}
                </p>

                {don.status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAccept(don.id, don.pickupRequested)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      <Check className="w-4 h-4" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(don.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                )}

                {don.status === 'accepted' && don.pickupRequested && !don.pickupScheduled && (
                  <button
                    onClick={() => {
                      updateDonation(don.id, { pickupScheduled: true, pickupDetails: 'Pickup scheduled for next week' });
                      showToast('Pickup details sent!', 'success');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Send Pickup Details
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
