import { useRef, useEffect } from "react";
import Message from "./Message";

function ChatBox({ chat, username }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="h-[70vh] overflow-y-auto p-4 bg-gray-800 rounded-xl shadow mb-4">
      {chat.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.username === username ? "justify-end" : "justify-start"
          } space-x-2`}
        >
          <div
            className={`p-3 rounded-lg ${
              message.username === username ? "bg-blue-600" : "bg-gray-700"
            } text-white`}
          >
            <div>{message.message}</div>

            {/* Show delivery status */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              {message.sent && !message.delivered && (
                <span className="inline-block text-xl">✓</span> // Sent (Single Tick)
              )}
              {message.delivered && (
                <span className="inline-block text-xl">✓✓</span> // Delivered (Double Tick)
              )}
            </div>
          </div>
        </div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
}

export default ChatBox;
