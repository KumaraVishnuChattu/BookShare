import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { MessageCircle, X } from 'lucide-react';

export default function MyRequests() {
  const { currentUser, requests, books, users, updateRequest, showToast } = useApp();

  if (!currentUser) return null;

  const myRequests = requests.filter(r => r.requesterId === currentUser.id);

  const handleCancel = (requestId: string) => {
    if (window.confirm('Cancel this request?')) {
      updateRequest(requestId, { status: 'cancelled' });
      showToast('Request cancelled', 'info');
    }
  };

  return (
    <Layout role="user">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Requests</h1>

        {myRequests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-600 mb-4">You haven't made any requests yet</p>
            <Link to="/user/browse" className="text-blue-600 hover:text-blue-700 font-medium">
              Browse books
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {myRequests.map(req => {
              const book = books.find(b => b.id === req.bookId);
              const owner = users.find(u => u.id === req.ownerId);

              return (
                <div key={req.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{book?.title}</h3>
                      <p className="text-sm text-gray-600">{book?.author}</p>
                      <p className="text-sm text-gray-500 mt-2">Owner: {owner?.name}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      req.status === 'accepted' ? 'bg-green-100 text-green-700' :
                      req.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      req.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">
                    Requested on {new Date(req.date).toLocaleDateString()}
                  </p>

                  <div className="flex gap-3">
                    {req.status === 'accepted' && (
                      <Link
                        to={`/user/chat/${req.id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Open Chat
                      </Link>
                    )}
                    {req.status === 'pending' && (
                      <button
                        onClick={() => handleCancel(req.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                      >
                        <X className="w-4 h-4" />
                        Cancel Request
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
