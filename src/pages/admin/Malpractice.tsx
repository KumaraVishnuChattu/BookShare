import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { AlertTriangle, Ban } from 'lucide-react';

export default function Malpractice() {
  const { complaints, users, addAdminLog, showToast } = useApp();

  const malpracticeReports = complaints.filter(c => c.category === 'Inappropriate Behavior' || c.category === 'No Show');

  const handleWarn = (targetId: string) => {
    addAdminLog({
      id: `log-${Date.now()}`,
      action: 'Issued Warning',
      targetId,
      details: 'Warning issued for reported behavior',
      date: new Date().toISOString()
    });
    showToast('Warning issued', 'warning');
  };

  const handleBlock = (targetId: string) => {
    addAdminLog({
      id: `log-${Date.now()}`,
      action: 'Blocked User',
      targetId,
      details: 'User blocked due to malpractice',
      date: new Date().toISOString()
    });
    showToast('User blocked', 'error');
  };

  return (
    <Layout role="admin">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Malpractice Reports</h1>

      {malpracticeReports.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-600">No malpractice reports</p>
        </div>
      ) : (
        <div className="space-y-4">
          {malpracticeReports.map(report => {
            const reporter = users.find(u => u.id === report.fromUserId);
            const targetUser = users.find(u => u.id === report.targetId);

            return (
              <div key={report.id} className="bg-white p-6 rounded-xl shadow-sm border-2 border-red-200">
                <div className="flex items-start gap-4 mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{report.category}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Reporter: {reporter?.name} • Target: {targetUser?.name || report.targetId}
                    </p>
                    <p className="text-gray-700 mb-3">{report.description}</p>
                    <p className="text-xs text-gray-500">Reported: {new Date(report.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleWarn(report.targetId)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Issue Warning
                  </button>
                  <button
                    onClick={() => handleBlock(report.targetId)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <Ban className="w-4 h-4" />
                    Block Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
