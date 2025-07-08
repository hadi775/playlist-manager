import React from 'react';
import { Plus } from 'lucide-react';

const FloatingButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50"
    >
      <Plus size={24} />
    </button>
  );
};

export default FloatingButton;