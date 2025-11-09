import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { MapPin, Star, ArrowLeft, Flag } from 'lucide-react';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, books, users, addRequest, showToast } = useApp();

  const book = books.find(b => b.id === id);
  const owner = book ? users.find(u => u.id === book.ownerId) : null;

  if (!currentUser || !book || !owner) {
    return (
      <Layout role="user">
        <div className="text-center py-12">
          <p className="text-gray-600">Book not found</p>
          <button onClick={() => navigate('/user/browse')} className="mt-4 text-blue-600">Go back</button>
        </div>
      </Layout>
    );
  }

  const handleRequest = () => {
    const newRequest = {
      id: `req-${Date.now()}`,
      bookId: book.id,
      requesterId: currentUser.id,
      ownerId: book.ownerId,
      status: 'pending' as const,
      date: new Date().toISOString().split('T')[0],
      messages: []
    };
    addRequest(newRequest);
    showToast('Request sent successfully!', 'success');
    navigate('/user/requests');
  };

  return (
    <Layout role="user">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl h-96 flex items-center justify-center">
          <div className="text-center p-8">
            <p className="text-3xl font-bold text-blue-800 mb-2">{book.title}</p>
            <p className="text-xl text-blue-600">{book.author}</p>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{book.author}</p>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Category</span>
              <span className="font-medium">{book.category}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Language</span>
              <span className="font-medium">{book.language}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Condition</span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                book.condition === 'Excellent' ? 'bg-green-100 text-green-700' :
                book.condition === 'Good' ? 'bg-blue-100 text-blue-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {book.condition}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Location</span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                {book.location} ({book.distanceKm} km)
              </span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Posted</span>
              <span className="font-medium">{new Date(book.postedDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{book.description}</p>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Owner</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                {owner.avatar}
              </div>
              <div>
                <p className="font-medium">{owner.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{owner.rating} rating</span>
                  <span>•</span>
                  <span>{owner.booksExchanged} exchanges</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRequest}
              disabled={book.status !== 'available'}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {book.status === 'available' ? 'Request Book' : 'Not Available'}
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Flag className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
