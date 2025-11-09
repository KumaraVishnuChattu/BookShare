import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';

export default function AllExchanges() {
  const { requests, books, users } = useApp();

  return (
    <Layout role="admin">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Exchange Requests</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map(req => {
                const book = books.find(b => b.id === req.bookId);
                const requester = users.find(u => u.id === req.requesterId);
                const owner = users.find(u => u.id === req.ownerId);

                return (
                  <tr key={req.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{book?.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{requester?.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{owner?.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        req.status === 'accepted' ? 'bg-green-100 text-green-700' :
                        req.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        req.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(req.date).toLocaleDateString()}</td>
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
