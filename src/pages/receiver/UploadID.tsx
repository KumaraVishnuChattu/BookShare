import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { Upload, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function UploadID() {
  const { currentReceiver, showToast } = useApp();

  if (!currentReceiver) return null;

  const handleUpload = () => {
    showToast('Document uploaded! Awaiting admin verification.', 'info');
  };

  return (
    <Layout role="receiver">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload Government ID</h1>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center gap-4 mb-6">
            {currentReceiver.verificationStatus === 'verified' && (
              <>
                <CheckCircle className="w-12 h-12 text-green-500" />
                <div>
                  <p className="text-lg font-semibold text-green-600">Verified</p>
                  <p className="text-sm text-gray-600">Your organization has been verified</p>
                </div>
              </>
            )}
            {currentReceiver.verificationStatus === 'pending' && (
              <>
                <Clock className="w-12 h-12 text-yellow-500" />
                <div>
                  <p className="text-lg font-semibold text-yellow-600">Pending Verification</p>
                  <p className="text-sm text-gray-600">Your documents are under review</p>
                </div>
              </>
            )}
            {currentReceiver.verificationStatus === 'not_submitted' && (
              <>
                <XCircle className="w-12 h-12 text-gray-400" />
                <div>
                  <p className="text-lg font-semibold text-gray-600">Not Submitted</p>
                  <p className="text-sm text-gray-600">Upload your registration documents</p>
                </div>
              </>
            )}
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500">Registration certificate, Trust deed, or Government approval letter</p>
            <button
              onClick={handleUpload}
              className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Upload Document
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
