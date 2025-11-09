import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { Search, Filter, MapPin, Star, Pin, Flag } from 'lucide-react';

export default function BrowseBooks() {
  const { currentUser, books, users, addRequest, togglePinBook, pinnedBooks, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [condition, setCondition] = useState('');
  const [maxDistance, setMaxDistance] = useState(5);

  if (!currentUser) return null;

  const filteredBooks = books
    .filter(b => b.status === 'available' && b.ownerId !== currentUser.id)
    .filter(b => !searchTerm || b.title.toLowerCase().includes(searchTerm.toLowerCase()) || b.author.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(b => !category || b.category === category)
    .filter(b => !language || b.language === language)
    .filter(b => !condition || b.condition === condition)
    .filter(b => b.distanceKm <= maxDistance);

  const handleRequest = (bookId: string, ownerId: string) => {
    const newRequest = {
      id: `req-${Date.now()}`,
      bookId,
      requesterId: currentUser.id,
      ownerId,
      status: 'pending' as const,
      date: new Date().toISOString().split('T')[0],
      messages: []
    };
    addRequest(newRequest);
    showToast('Request sent successfully!', 'success');
  };

  return (
    <Layout role="user">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Browse Books</h1>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search title or author..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">All Categories</option>
              <option value="School Textbooks">School Textbooks</option>
              <option value="Higher Education">Higher Education</option>
              <option value="Story Books">Story Books</option>
              <option value="Competitive Exams">Competitive Exams</option>
              <option value="Regional Literature">Regional Literature</option>
            </select>

            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">All Languages</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Malayalam">Malayalam</option>
            </select>

            <select value={condition} onChange={(e) => setCondition(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">All Conditions</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>

            <div>
              <label className="text-xs text-gray-600 block mb-1">Max Distance: {maxDistance} km</label>
              <input
                type="range"
                min="1"
                max="10"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">{filteredBooks.length} books found</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => {
            const owner = users.find(u => u.id === book.ownerId);
            const isPinned = pinnedBooks.includes(book.id);

            return (
              <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-800">{book.title}</p>
                    <p className="text-sm text-blue-600">{book.author}</p>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm text-gray-600">{book.category}</p>
                      <p className="text-xs text-gray-500">{book.language}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      book.condition === 'Excellent' ? 'bg-green-100 text-green-700' :
                      book.condition === 'Good' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {book.condition}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{book.distanceKm} km away</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <span className="font-medium">{owner?.name}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{owner?.rating}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRequest(book.id, book.ownerId)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                    >
                      Request
                    </button>
                    <button
                      onClick={() => {
                        togglePinBook(book.id);
                        showToast(isPinned ? 'Removed from wishlist' : 'Added to wishlist', 'info');
                      }}
                      className={`px-4 py-2 rounded-lg transition ${
                        isPinned ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Pin className="w-4 h-4" />
                    </button>
                    <Link
                      to={`/user/book/${book.id}`}
                      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
                    >
                      <Flag className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
