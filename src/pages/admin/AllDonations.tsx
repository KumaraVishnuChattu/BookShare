import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';

export default function AllDonations() {
  const { donations, books, users, receivers } = useApp();

  return (
    <Layout role="admin">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Donation Requests</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receiver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pickup</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {donations.map(don => {
                const book = books.find(b => b.id === don.bookId);
                const donor = users.find(u => u.id === don.donorId);
                const receiver = receivers.find(r => r.id === don.receiverId);

                return (
                  <tr key={don.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{book?.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{donor?.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{receiver?.orgName}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        don.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        don.status === 'accepted' ? 'bg-green-100 text-green-700' :
                        don.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {don.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(don.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {don.pickupRequested ? (don.pickupScheduled ? 'Scheduled' : 'Requested') : 'No'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
