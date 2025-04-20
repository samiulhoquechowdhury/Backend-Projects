import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import UsernameForm from "../components/UsernameForm";
import ChatBox from "../components/ChatBox";

const socket = io(import.meta.env.VITE_BACKEND_URL);

function App() {
  const [username, setUsername] = useState("");
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [someoneTyping, setSomeoneTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  const inputRef = useRef(null);
  let typingTimeout;

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });

    socket.on("user_typing", (username) => {
      setSomeoneTyping(true);
      setTypingUser(username);
    });

    socket.on("user_stop_typing", () => {
      setSomeoneTyping(false);
      setTypingUser("");
    });

    socket.on("online_users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_typing");
      socket.off("user_stop_typing");
      socket.off("online_users");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("send_message", { username, message });
      socket.emit("stop_typing");
      setMessage("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleTyping = () => {
    socket.emit("typing", username);

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("stop_typing");
    }, 1000);
  };

  if (!username) return <UsernameForm setUsername={setUsername} />;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Sidebar */}
      <div className="hidden md:flex w-1/4 bg-gray-800 p-6 flex-col border-r border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center">Online Users</h2>
        <ul className="space-y-5 overflow-y-auto flex-1">
          {onlineUsers.map((user, idx) => (
            <li key={idx} className="flex items-center gap-3 text-gray-300">
              <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              <span className="truncate">{user}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col p-6">
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-800 rounded-2xl shadow-md">
          {/* Header */}
          <div className="p-4 border-b border-gray-700 text-center text-xl font-semibold">
            Group Chat
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <ChatBox chat={chat} username={username} />

            {/* Typing indicator inside chat flow */}
            {someoneTyping && (
              <div className="flex items-center gap-2 text-gray-400 text-sm animate-pulse">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                {typingUser} is typing...
              </div>
            )}
          </div>

          {/* Message input */}
          <form
            onSubmit={sendMessage}
            className="flex gap-3 p-4 border-t border-gray-700 bg-gray-800"
          >
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={message}
              ref={inputRef}
              onChange={(e) => {
                setMessage(e.target.value);
                handleTyping();
              }}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition font-semibold"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
