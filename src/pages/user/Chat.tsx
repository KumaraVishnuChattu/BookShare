import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../../components/Layout';
import { Send, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';

export default function Chat() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { currentUser, requests, books, users, updateRequest, updateBook, showToast } = useApp();
  const [message, setMessage] = useState('');

  if (!currentUser) return null;

  const request = requests.find(r => r.id === requestId);
  const book = request ? books.find(b => b.id === request.bookId) : null;
  const otherUser = request ? users.find(u => u.id === (request.ownerId === currentUser.id ? request.requesterId : request.ownerId)) : null;

  if (!request || !book || !otherUser) {
    return (
      <Layout role="user">
        <div className="text-center py-12">
          <p className="text-gray-600">Chat not found</p>
        </div>
      </Layout>
    );
  }

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        from: currentUser.id,
        text: message,
        timestamp: new Date().toISOString()
      };
      updateRequest(request.id, {
        messages: [...request.messages, newMessage]
      });
      setMessage('');
    }
  };

  const handleComplete = () => {
    if (window.confirm('Mark this exchange as completed?')) {
      updateRequest(request.id, { status: 'completed' });
      updateBook(book.id, { status: 'exchanged' });
      showToast('Exchange completed successfully!', 'success');
      navigate('/user/requests');
    }
  };

  const handleShareLocation = () => {
    const locationMsg = {
      from: currentUser.id,
      text: `📍 Shared location: ${currentUser.city}`,
      timestamp: new Date().toISOString()
    };
    updateRequest(request.id, {
      messages: [...request.messages, locationMsg]
    });
    showToast('Location shared', 'success');
  };

  return (
    <Layout role="user">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
              <p className="text-sm text-gray-600">Chat with {otherUser.name}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleShareLocation}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
              >
                <MapPin className="w-4 h-4" />
                Share Location
              </button>
              <button
                onClick={handleComplete}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <CheckCircle className="w-4 h-4" />
                Mark Complete
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[500px]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {request.messages.length === 0 ? (
              <p className="text-center text-gray-500 text-sm">No messages yet. Start the conversation!</p>
            ) : (
              request.messages.map((msg, idx) => {
                const isMe = msg.from === currentUser.id;
                return (
                  <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-lg ${
                      isMe ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
