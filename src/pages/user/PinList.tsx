import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { Pin, BookOpen } from 'lucide-react';

export default function PinList() {
  const { currentUser, pinnedBooks, books, togglePinBook, showToast } = useApp();

  if (!currentUser) return null;

  const pinnedBooksList = books.filter(b => pinnedBooks.includes(b.id));

  return (
    <Layout role="user">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h1>

      {pinnedBooksList.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <Pin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No books pinned yet</p>
          <Link to="/user/browse" className="text-blue-600 hover:text-blue-700 font-medium">
            Browse books to add to wishlist
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pinnedBooksList.map(book => (
            <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                <p className="text-lg font-bold text-yellow-800 text-center px-4">{book.title}</p>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                <span className={`inline-block text-xs px-3 py-1 rounded-full mb-4 ${
                  book.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {book.status === 'available' ? 'Available' : 'Not Available'}
                </span>
                <div className="flex gap-2">
                  <Link
                    to={`/user/book/${book.id}`}
                    className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => {
                      togglePinBook(book.id);
                      showToast('Removed from wishlist', 'info');
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
