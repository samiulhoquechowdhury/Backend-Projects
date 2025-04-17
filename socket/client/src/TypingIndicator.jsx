import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1 mt-1">
      <span className="bg-gray-400 w-2 h-2 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="bg-gray-400 w-2 h-2 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="bg-gray-400 w-2 h-2 rounded-full animate-bounce"></span>
    </div>
  );
};

export default TypingIndicator;
