import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { Trash2, Flag } from 'lucide-react';

export default function AllBooks() {
  const { books, users, deleteBook, showToast } = useApp();

  const activeBooks = books.filter(b => b.status !== 'deleted');

  const handleRemove = (bookId: string) => {
    if (window.confirm('Remove this book listing?')) {
      deleteBook(bookId);
      showToast('Book removed', 'info');
    }
  };

  return (
    <Layout role="admin">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Books</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activeBooks.map(book => {
                const owner = users.find(u => u.id === book.ownerId);

                return (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{book.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{book.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{owner?.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{book.category}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        book.status === 'available' ? 'bg-green-100 text-green-700' :
                        book.status === 'under_claim' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {book.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button className="p-2 text-orange-600 hover:bg-orange-50 rounded">
                          <Flag className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRemove(book.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
