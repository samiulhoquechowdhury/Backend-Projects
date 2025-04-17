import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import TypingIndicator from "./TypingIndicator";

const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  let typingTimeoutRef = useRef(null);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [
        ...prev,
        { message: data.message, sender: "other", time: data.time },
      ]);
    });

    socket.on("typing", () => {
      setIsTyping(true);
    });

    socket.on("stop_typing", () => {
      setIsTyping(false);
    });

    return () => {
      socket.off("receive_message");
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sendMessage = () => {
    if (message.trim() === "") return;
    const time = getCurrentTime();
    socket.emit("send_message", { message, time });
    socket.emit("stop_typing");
    setChat((prev) => [...prev, { message, sender: "me", time }]);
    setMessage("");
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    socket.emit("typing");

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing");
    }, 1000);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg flex flex-col h-[80vh]">
        <div className="bg-blue-600 text-white text-center py-4 rounded-t-lg text-xl font-semibold">
          💬 Real-Time Chat
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
          {chat.map((item, index) => (
            <div
              key={index}
              className={`flex ${
                item.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex flex-col items-start max-w-[75%]">
                <div
                  className={`px-4 py-2 rounded-2xl break-words ${
                    item.sender === "me"
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-200 text-gray-800 self-start"
                  }`}
                >
                  {item.message}
                </div>
                <span className="text-xs text-gray-500 mt-1 self-end">
                  {item.time}
                </span>
              </div>
            </div>
          ))}
          {isTyping && <TypingIndicator />}

          <div ref={chatEndRef} />
        </div>

        <div className="flex items-center p-3 border-t gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            value={message}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
