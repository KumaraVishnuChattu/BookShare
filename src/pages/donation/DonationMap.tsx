import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { MapPin, Heart, Check } from 'lucide-react';

export default function DonationMap() {
  const { currentUser, receivers, books, addDonation, showToast } = useApp();
  const [selectedReceiver, setSelectedReceiver] = useState<string | null>(null);
  const [filterType, setFilterType] = useState('');
  const [filterNeeds, setFilterNeeds] = useState('');
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  if (!currentUser) return null;

  const verifiedReceivers = receivers.filter(r => r.verified);
  const filteredReceivers = verifiedReceivers
    .filter(r => !filterType || r.orgType === filterType)
    .filter(r => !filterNeeds || r.needs.includes(filterNeeds));

  const myAvailableBooks = books.filter(b => b.ownerId === currentUser.id && b.status === 'available');

  const handleDonate = () => {
    if (!selectedReceiver || selectedBooks.length === 0) {
      showToast('Please select books to donate', 'warning');
      return;
    }

    const receiver = receivers.find(r => r.id === selectedReceiver);
    selectedBooks.forEach(bookId => {
      const donation = {
        id: `don-${Date.now()}-${bookId}`,
        donorId: currentUser.id,
        receiverId: selectedReceiver,
        bookId,
        status: 'pending' as const,
        pickupRequested: receiver?.pickupAvailable || false,
        pickupScheduled: false,
        date: new Date().toISOString().split('T')[0]
      };
      addDonation(donation);
    });

    showToast(`Donation request sent to ${receiver?.orgName}!`, 'success');
    setShowDonateModal(false);
    setSelectedBooks([]);
    setSelectedReceiver(null);
  };

  const receiver = selectedReceiver ? receivers.find(r => r.id === selectedReceiver) : null;

  return (
    <Layout role="user">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Donate to Verified Organizations</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold mb-3">Filters</h3>
              <div className="space-y-3">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">All Types</option>
                  <option value="orphanage">Orphanage</option>
                  <option value="school">School</option>
                  <option value="library">Library</option>
                  <option value="ngo">NGO</option>
                </select>

                <select
                  value={filterNeeds}
                  onChange={(e) => setFilterNeeds(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">All Needs</option>
                  <option value="School Textbooks">School Textbooks</option>
                  <option value="Story Books">Story Books</option>
                  <option value="Higher Education">Higher Education</option>
                  <option value="Competitive Exams">Competitive Exams</option>
                </select>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold mb-3">Verified Receivers</h3>
              <div className="space-y-2">
                {filteredReceivers.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedReceiver(r.id)}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      selectedReceiver === r.id ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <p className="font-medium text-sm">{r.orgName}</p>
                    <p className="text-xs text-gray-600">{r.orgType.charAt(0).toUpperCase() + r.orgType.slice(1)}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Check className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">Verified</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-4">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Map showing verified receiver locations</p>
                </div>
              </div>
            </div>

            {receiver && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{receiver.orgName}</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium capitalize">{receiver.orgType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address</span>
                    <span className="font-medium">{receiver.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact</span>
                    <span className="font-medium">{receiver.contact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pickup Available</span>
                    <span className={`font-medium ${receiver.pickupAvailable ? 'text-green-600' : 'text-red-600'}`}>
                      {receiver.pickupAvailable ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Books Received</span>
                    <span className="font-medium">{receiver.receivedCount}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Books Needed</h3>
                  <div className="flex flex-wrap gap-2">
                    {receiver.needs.map(need => (
                      <span key={need} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {need}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowDonateModal(true)}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Donate Books
                </button>
              </div>
            )}
          </div>
        </div>

        {showDonateModal && receiver && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Select Books to Donate</h3>
              {myAvailableBooks.length === 0 ? (
                <p className="text-gray-600 mb-4">You don't have any available books to donate</p>
              ) : (
                <div className="space-y-2 mb-6">
                  {myAvailableBooks.map(book => (
                    <label key={book.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={selectedBooks.includes(book.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBooks([...selectedBooks, book.id]);
                          } else {
                            setSelectedBooks(selectedBooks.filter(id => id !== book.id));
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="font-medium text-sm">{book.title}</p>
                        <p className="text-xs text-gray-600">{book.category}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
              {!receiver.pickupAvailable && (
                <p className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg mb-4">
                  Note: This organization does not offer pickup. You'll need to deliver the books yourself.
                </p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDonateModal(false);
                    setSelectedBooks([]);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDonate}
                  disabled={selectedBooks.length === 0}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
                >
                  Submit Donation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
