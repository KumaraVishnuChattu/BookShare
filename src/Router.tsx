import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import UserLogin from './pages/auth/UserLogin';
import ReceiverLogin from './pages/auth/ReceiverLogin';
import AdminLogin from './pages/auth/AdminLogin';
import UserDashboard from './pages/user/Dashboard';
import BrowseBooks from './pages/user/BrowseBooks';
import BookDetails from './pages/user/BookDetails';
import UploadBook from './pages/user/UploadBook';
import MyListedBooks from './pages/user/MyListedBooks';
import MyRequests from './pages/user/MyRequests';
import Chat from './pages/user/Chat';
import PinList from './pages/user/PinList';
import UserProfile from './pages/user/UserProfile';
import DonationMap from './pages/donation/DonationMap';
import DonationRequests from './pages/donation/DonationRequests';
import ReceiverDashboard from './pages/receiver/Dashboard';
import UploadID from './pages/receiver/UploadID';
import MyNeeds from './pages/receiver/MyNeeds';
import ReceiverDonations from './pages/receiver/ReceiverDonations';
import PickupRequests from './pages/receiver/PickupRequests';
import ReceiverMap from './pages/receiver/ReceiverMap';
import ReceiverProfile from './pages/receiver/ReceiverProfile';
import AdminDashboard from './pages/admin/Dashboard';
import VerifyReceivers from './pages/admin/VerifyReceivers';
import Complaints from './pages/admin/Complaints';
import Malpractice from './pages/admin/Malpractice';
import AllUsers from './pages/admin/AllUsers';
import AllBooks from './pages/admin/AllBooks';
import AllDonations from './pages/admin/AllDonations';
import AllExchanges from './pages/admin/AllExchanges';

const ProtectedRoute = ({
  children,
  requireUser,
  requireReceiver,
  requireAdmin
}: {
  children: React.ReactNode;
  requireUser?: boolean;
  requireReceiver?: boolean;
  requireAdmin?: boolean;
}) => {
  const { currentUser, currentReceiver, isAdmin } = useApp();

  if (requireUser && !currentUser) {
    return <Navigate to="/login-user" />;
  }
  if (requireReceiver && !currentReceiver) {
    return <Navigate to="/login-receiver" />;
  }
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/login-admin" />;
  }

  return <>{children}</>;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login-user" element={<UserLogin />} />
        <Route path="/login-receiver" element={<ReceiverLogin />} />
        <Route path="/login-admin" element={<AdminLogin />} />

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute requireUser>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/browse"
          element={
            <ProtectedRoute requireUser>
              <BrowseBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/book/:id"
          element={
            <ProtectedRoute requireUser>
              <BookDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/upload"
          element={
            <ProtectedRoute requireUser>
              <UploadBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/my-books"
          element={
            <ProtectedRoute requireUser>
              <MyListedBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/requests"
          element={
            <ProtectedRoute requireUser>
              <MyRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/chat/:requestId"
          element={
            <ProtectedRoute requireUser>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/pins"
          element={
            <ProtectedRoute requireUser>
              <PinList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute requireUser>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donate/map"
          element={
            <ProtectedRoute requireUser>
              <DonationMap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donate/requests"
          element={
            <ProtectedRoute requireUser>
              <DonationRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/receiver/dashboard"
          element={
            <ProtectedRoute requireReceiver>
              <ReceiverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receiver/upload-id"
          element={
            <ProtectedRoute requireReceiver>
              <UploadID />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receiver/needs"
          element={
            <ProtectedRoute requireReceiver>
              <MyNeeds />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receiver/donations"
          element={
            <ProtectedRoute requireReceiver>
              <ReceiverDonations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receiver/pickups"
          element={
            <ProtectedRoute requireReceiver>
              <PickupRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receiver/map"
          element={
            <ProtectedRoute requireReceiver>
              <ReceiverMap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receiver/profile"
          element={
            <ProtectedRoute requireReceiver>
              <ReceiverProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/verify-receivers"
          element={
            <ProtectedRoute requireAdmin>
              <VerifyReceivers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/complaints"
          element={
            <ProtectedRoute requireAdmin>
              <Complaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/malpractice"
          element={
            <ProtectedRoute requireAdmin>
              <Malpractice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requireAdmin>
              <AllUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/books"
          element={
            <ProtectedRoute requireAdmin>
              <AllBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/donations"
          element={
            <ProtectedRoute requireAdmin>
              <AllDonations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/exchanges"
          element={
            <ProtectedRoute requireAdmin>
              <AllExchanges />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
