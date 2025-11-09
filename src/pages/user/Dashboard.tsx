import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { BookOpen, Upload, Heart, MapPin, Award, Package } from 'lucide-react';

export default function UserDashboard() {
  const { currentUser, books, requests } = useApp();

  if (!currentUser) return null;

  const nearbyBooks = books
    .filter(b => b.status === 'available' && b.ownerId !== currentUser.id)
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 5);

  const myBooks = books
    .filter(b => b.ownerId === currentUser.id && b.status !== 'deleted')
    .slice(0, 3);

  const myRequests = requests
    .filter(r => r.requesterId === currentUser.id && r.status === 'pending')
    .slice(0, 3);

  return (
    <Layout role="user">
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-gray-600">Manage your books and connect with readers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-gray-800">{currentUser.points}</p>
                <p className="text-sm text-gray-600">Points Earned</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-gray-800">{currentUser.booksExchanged}</p>
                <p className="text-sm text-gray-600">Books Exchanged</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-gray-800">{currentUser.booksDonated}</p>
                <p className="text-sm text-gray-600">Books Donated</p>
              </div>
            </div>
          </div>
        </div>

        {currentUser.badges.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl shadow-sm border border-yellow-200 mb-8">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Your Badges
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentUser.badges.map(badge => (
                <span key={badge} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link
            to="/user/upload"
            className="bg-blue-500 text-white p-6 rounded-xl hover:bg-blue-600 transition shadow-md"
          >
            <Upload className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Post a Book</h3>
            <p className="text-sm text-blue-100">Share your books with the community</p>
          </Link>

          <Link
            to="/user/browse"
            className="bg-green-500 text-white p-6 rounded-xl hover:bg-green-600 transition shadow-md"
          >
            <BookOpen className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Browse Books</h3>
            <p className="text-sm text-green-100">Find books near you</p>
          </Link>

          <Link
            to="/donate/map"
            className="bg-red-500 text-white p-6 rounded-xl hover:bg-red-600 transition shadow-md"
          >
            <Heart className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Donate</h3>
            <p className="text-sm text-red-100">Give to verified organizations</p>
          </Link>

          <Link
            to="/user/requests"
            className="bg-orange-500 text-white p-6 rounded-xl hover:bg-orange-600 transition shadow-md"
          >
            <MapPin className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">My Requests</h3>
            <p className="text-sm text-orange-100">Track your exchanges</p>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Nearby Books</h3>
              <Link to="/user/browse" className="text-sm text-blue-600 hover:text-blue-700">View All</Link>
            </div>
            <div className="space-y-3">
              {nearbyBooks.map(book => (
                <Link
                  key={book.id}
                  to={`/user/book/${book.id}`}
                  className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition"
                >
                  <div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{book.title}</p>
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {book.distanceKm} km away
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      {book.condition}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">My Listed Books</h3>
                <Link to="/user/my-books" className="text-sm text-blue-600 hover:text-blue-700">View All</Link>
              </div>
              <div className="space-y-3">
                {myBooks.length > 0 ? (
                  myBooks.map(book => (
                    <div key={book.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{book.title}</p>
                        <p className="text-xs text-gray-600">{book.category}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        book.status === 'available' ? 'bg-green-100 text-green-700' :
                        book.status === 'under_claim' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {book.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">No books listed yet</p>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Requests</h3>
              <div className="space-y-3">
                {myRequests.length > 0 ? (
                  myRequests.map(req => {
                    const book = books.find(b => b.id === req.bookId);
                    return (
                      <div key={req.id} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-800 text-sm">{book?.title}</p>
                        <p className="text-xs text-gray-600 mt-1">Requested on {new Date(req.date).toLocaleDateString()}</p>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">No pending requests</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
