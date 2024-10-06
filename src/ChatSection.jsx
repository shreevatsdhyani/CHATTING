import React, { useState } from 'react';

// Sample users data
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' },
  { id: 5, name: 'Emma' },
];

const ChatList = ({ onSelectUser }) => {
  return (
    <div className="chat-list">
      {users.map((user) => (
        <div key={user.id} className="chat-list-item" onClick={() => onSelectUser(user)}>
          <div className="user-avatar">
            <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={`${user.name}`} />
          </div>
          <div className="user-info">
            <p className="user-name">{user.name}</p>
            <p className="last-message">Last message...</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const ChatSection = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState({}); // Store chat history for each user

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMessage('');
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return; // Prevent empty messages

    const updatedHistory = { ...chatHistory };
    if (!updatedHistory[selectedUser.id]) {
      updatedHistory[selectedUser.id] = []; // Initialize chat history if empty
    }

    updatedHistory[selectedUser.id].push({ message, sender: 'You' }); // Store message in chat history

    setChatHistory(updatedHistory);
    setMessage(''); // Clear the input field after sending
  };

  return (
    <div className="chat-section">
      <div className="user-list">
        <h3>Chats</h3>
        <ChatList onSelectUser={handleSelectUser} />
      </div>

      <div className="chat-area">
        {selectedUser ? (
          <div>
            <h4>Chat with {selectedUser.name}</h4>
            <div className="chat-history">
              {chatHistory[selectedUser.id]?.map((chat, index) => (
                <div key={index} className="chat-message">
                  <p><strong>{chat.sender}:</strong> {chat.message}</p>
                </div>
              )) || <p>No messages yet</p>}
            </div>

            {/* Chat input box */}
            <div className="chat-input">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Type a message to ${selectedUser.name}`}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default ChatSection;
