import React from 'react';

const Message = ({ message }) => {
  if (!message.text) return null;

  return (
    <div className={`mb-6 p-4 rounded-lg text-center font-medium ${
      message.type === 'success' 
        ? 'bg-green-900 text-green-200 border border-green-700' 
        : 'bg-red-900 text-red-200 border border-red-700'
    }`}>
      {message.text}
    </div>
  );
};

export default Message;