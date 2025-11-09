import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { CheckCircle, Heart } from 'lucide-react';

export default function ReceiverProfile() {
  const { currentReceiver } = useApp();

  if (!currentReceiver) return null;

  return (
    <Layout role="receiver">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{currentReceiver.orgName}</h1>
              <p className="text-gray-600 capitalize">{currentReceiver.orgType}</p>
            </div>
            {currentReceiver.verified && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Verified</span>
              </div>
            )}
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Address</span>
              <span className="font-medium text-right">{currentReceiver.address}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Contact</span>
              <span className="font-medium">{currentReceiver.contact}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Books Received</span>
              <span className="font-medium">{currentReceiver.receivedCount}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Pickup Available</span>
              <span className={`font-medium ${currentReceiver.pickupAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {currentReceiver.pickupAvailable ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Books Needed</h3>
            <div className="flex flex-wrap gap-2">
              {currentReceiver.needs.map(need => (
                <span key={need} className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {need}
                </span>
              ))}
            </div>
          </div>
        </div>

        {currentReceiver.thankMessages.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Thank You Messages
            </h2>
            <div className="space-y-4">
              {currentReceiver.thankMessages.map((msg, idx) => (
                <div key={idx} className="p-4 bg-red-50 rounded-lg">
                  <p className="text-gray-700 mb-2">{msg.msg}</p>
                  <p className="text-sm text-gray-600">— {msg.donorName}, {new Date(msg.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
