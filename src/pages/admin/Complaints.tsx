import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { Check, AlertTriangle } from 'lucide-react';

export default function Complaints() {
  const { complaints, users, updateComplaint, showToast } = useApp();

  const handleResolve = (complaintId: string) => {
    updateComplaint(complaintId, { status: 'resolved' });
    showToast('Complaint marked as resolved', 'success');
  };

  const handleEscalate = (complaintId: string) => {
    updateComplaint(complaintId, { status: 'escalated' });
    showToast('Complaint escalated', 'warning');
  };

  return (
    <Layout role="admin">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Complaints & Grievances</h1>

      <div className="mb-4">
        <p className="text-gray-600">
          {complaints.filter(c => c.status === 'open').length} open complaints
        </p>
      </div>

      {complaints.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-600">No complaints</p>
        </div>
      ) : (
        <div className="space-y-4">
          {complaints.map(complaint => {
            const fromUser = users.find(u => u.id === complaint.fromUserId);

            return (
              <div key={complaint.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{complaint.category}</h3>
                    <p className="text-sm text-gray-600">From: {fromUser?.name}</p>
                    <p className="text-xs text-gray-500">Target: {complaint.targetType} ({complaint.targetId})</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    complaint.status === 'open' ? 'bg-red-100 text-red-700' :
                    complaint.status === 'resolved' ? 'bg-green-100 text-green-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{complaint.description}</p>
                <p className="text-xs text-gray-500 mb-4">Filed: {new Date(complaint.date).toLocaleDateString()}</p>

                {complaint.status === 'open' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleResolve(complaint.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      <Check className="w-4 h-4" />
                      Mark Resolved
                    </button>
                    <button
                      onClick={() => handleEscalate(complaint.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Escalate
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
