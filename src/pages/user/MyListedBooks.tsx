import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { Edit, Trash2, BookOpen } from 'lucide-react';

export default function MyListedBooks() {
  const { currentUser, books, deleteBook, showToast } = useApp();

  if (!currentUser) return null;

  const myBooks = books.filter(b => b.ownerId === currentUser.id && b.status !== 'deleted');

  const handleDelete = (bookId: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook(bookId);
      showToast('Book deleted successfully', 'success');
    }
  };

  return (
    <Layout role="user">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Listed Books</h1>
          <Link to="/user/upload" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Post New Book
          </Link>
        </div>

        {myBooks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">You haven't posted any books yet</p>
            <Link to="/user/upload" className="text-blue-600 hover:text-blue-700 font-medium">
              Post your first book
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBooks.map(book => (
              <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <p className="text-lg font-bold text-blue-800 text-center px-4">{book.title}</p>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                  <p className="text-xs text-gray-500 mb-3">{book.category}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      book.status === 'available' ? 'bg-green-100 text-green-700' :
                      book.status === 'under_claim' ? 'bg-yellow-100 text-yellow-700' :
                      book.status === 'donated' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {book.status.replace('_', ' ')}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      book.condition === 'Excellent' ? 'bg-green-100 text-green-700' :
                      book.condition === 'Good' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {book.condition}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-sm">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
