import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { Check, X } from 'lucide-react';

export default function VerifyReceivers() {
  const { receivers, updateReceiver, addAdminLog, showToast } = useApp();

  const pendingReceivers = receivers.filter(r => r.verificationStatus === 'pending');

  const handleApprove = (receiverId: string) => {
    updateReceiver(receiverId, { verified: true, verificationStatus: 'verified' });
    addAdminLog({
      id: `log-${Date.now()}`,
      action: 'Approved Receiver',
      targetId: receiverId,
      details: 'Verified organization documentation',
      date: new Date().toISOString()
    });
    showToast('Receiver approved and verified', 'success');
  };

  const handleReject = (receiverId: string) => {
    updateReceiver(receiverId, { verified: false, verificationStatus: 'rejected' });
    showToast('Receiver verification rejected', 'info');
  };

  return (
    <Layout role="admin">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Receiver Verification Requests</h1>

      {pendingReceivers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-600">No pending verifications</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingReceivers.map(receiver => (
            <div key={receiver.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{receiver.orgName}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">{receiver.orgType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Address:</span>
                      <span className="font-medium text-right">{receiver.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contact:</span>
                      <span className="font-medium">{receiver.contact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{receiver.email}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Registration Document:</p>
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 text-sm">Document Preview</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleApprove(receiver.id)}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  <Check className="w-5 h-5" />
                  Approve & Verify
                </button>
                <button
                  onClick={() => handleReject(receiver.id)}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  <X className="w-5 h-5" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
