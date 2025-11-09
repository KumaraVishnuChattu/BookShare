import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { Plus, X } from 'lucide-react';

export default function MyNeeds() {
  const { currentReceiver, updateReceiver, showToast } = useApp();
  const [newNeed, setNewNeed] = useState('');

  if (!currentReceiver) return null;

  const addNeed = () => {
    if (newNeed.trim() && !currentReceiver.needs.includes(newNeed.trim())) {
      updateReceiver(currentReceiver.id, {
        needs: [...currentReceiver.needs, newNeed.trim()]
      });
      showToast('Need added successfully', 'success');
      setNewNeed('');
    }
  };

  const removeNeed = (need: string) => {
    updateReceiver(currentReceiver.id, {
      needs: currentReceiver.needs.filter(n => n !== need)
    });
    showToast('Need removed', 'info');
  };

  return (
    <Layout role="receiver">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Required Books</h1>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-6">
          <h3 className="font-semibold mb-4">Add Book Category Needed</h3>
          <div className="flex gap-2 mb-6">
            <select
              value={newNeed}
              onChange={(e) => setNewNeed(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Category</option>
              <option value="School Textbooks">School Textbooks</option>
              <option value="Higher Education">Higher Education</option>
              <option value="Story Books">Story Books</option>
              <option value="Competitive Exams">Competitive Exams</option>
              <option value="Regional Literature">Regional Literature</option>
            </select>
            <button
              onClick={addNeed}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          <h3 className="font-semibold mb-4">Current Needs</h3>
          <div className="space-y-2">
            {currentReceiver.needs.map(need => (
              <div key={need} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-green-700">{need}</span>
                <button
                  onClick={() => removeNeed(need)}
                  className="p-1 hover:bg-red-100 rounded transition"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
