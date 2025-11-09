import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { Award, BookOpen, Heart, Package, Star } from 'lucide-react';

export default function UserProfile() {
  const { currentUser } = useApp();

  if (!currentUser) return null;

  return (
    <Layout role="user">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl">
              {currentUser.avatar}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{currentUser.name}</h1>
              <p className="text-gray-600">{currentUser.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{currentUser.rating}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{currentUser.bio}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">{currentUser.points}</p>
              <p className="text-sm text-gray-600">Points</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">{currentUser.booksPosted}</p>
              <p className="text-sm text-gray-600">Posted</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Package className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">{currentUser.booksExchanged}</p>
              <p className="text-sm text-gray-600">Exchanged</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">{currentUser.booksDonated}</p>
              <p className="text-sm text-gray-600">Donated</p>
            </div>
          </div>
        </div>

        {currentUser.badges.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Badges</h2>
            <div className="flex flex-wrap gap-3">
              {currentUser.badges.map(badge => (
                <div key={badge} className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full font-medium shadow-md">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">City</span>
              <span className="font-medium">{currentUser.city}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Phone</span>
              <span className="font-medium">{currentUser.phone}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Member Since</span>
              <span className="font-medium">January 2025</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
