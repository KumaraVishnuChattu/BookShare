import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { MapPin } from 'lucide-react';

export default function ReceiverMap() {
  const { books, users } = useApp();

  const donorLocations = books
    .filter(b => b.status === 'available')
    .map(b => {
      const owner = users.find(u => u.id === b.ownerId);
      return { book: b, owner };
    });

  return (
    <Layout role="receiver">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Donor Map View</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Map showing donor locations</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donorLocations.slice(0, 9).map(({ book, owner }) => (
          <div key={book.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="font-semibold text-gray-800">{owner?.name}</p>
            <p className="text-sm text-gray-600">{owner?.city}</p>
            <p className="text-xs text-gray-500 mt-2">{book.title}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
