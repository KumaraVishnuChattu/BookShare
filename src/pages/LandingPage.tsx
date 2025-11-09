import { Link } from 'react-router-dom';
import { BookOpen, Users, Heart, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">BookShare</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Share Knowledge, Build Communities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Exchange books with fellow readers or donate to verified organizations. Join a community dedicated to spreading education and literacy.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <Link
              to="/login-user"
              className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition">
                <Users className="w-8 h-8 text-blue-600 group-hover:text-white transition" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Login as User</h3>
              <p className="text-gray-600 text-sm">Exchange books with others or donate to verified organizations</p>
            </Link>

            <Link
              to="/login-receiver"
              className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-500"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition">
                <Heart className="w-8 h-8 text-green-600 group-hover:text-white transition" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Login as Receiver</h3>
              <p className="text-gray-600 text-sm">Schools, libraries, orphanages, and NGOs accepting donations</p>
            </Link>

            <Link
              to="/login-admin"
              className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-gray-700"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-700 transition">
                <Shield className="w-8 h-8 text-gray-600 group-hover:text-white transition" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Admin Portal</h3>
              <p className="text-gray-600 text-sm">Manage verifications, complaints, and platform operations</p>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold mb-2">Exchange Books</h3>
            <p className="text-gray-600 text-sm">Browse nearby books, request exchanges, and connect with fellow readers in your community</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold mb-2">Donate to Verified Organizations</h3>
            <p className="text-gray-600 text-sm">Support schools, libraries, orphanages, and NGOs with books they need for education</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold mb-2">Verified & Secure</h3>
            <p className="text-gray-600 text-sm">All receivers are verified by admins. Track your impact with badges and points</p>
          </div>
        </div>

        <div className="mt-16 text-center text-sm text-gray-500">
          <p className="mb-2">This is a frontend-only prototype demonstration.</p>
          <p>All actions modify client-side state only. No real authentication or backend services.</p>
        </div>
      </main>
    </div>
  );
}
