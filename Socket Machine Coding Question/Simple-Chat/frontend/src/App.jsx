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

  const inputRef = useRef(null); // for auto-focus

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

    // Clean up when component unmounts
    return () => {
      socket.off("receive_message");
      socket.off("user_typing");
      socket.off("user_stop_typing");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("send_message", { username, message });
      socket.emit("stop_typing");
      setMessage("");
      if (inputRef.current) {
        inputRef.current.focus(); // auto-focus input after sending
      }
    }
  };

  let typingTimeout;

  const handleTyping = () => {
    socket.emit("typing", username);

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("stop_typing");
    }, 1000); // stops typing after 1 sec idle
  };

  if (!username) return <UsernameForm setUsername={setUsername} />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-4">Real-Time Chat</h1>

        <ChatBox chat={chat} username={username} />

        {someoneTyping && (
          <div className="text-sm text-gray-500 mb-2">
            {typingUser} is typing...
          </div>
        )}

        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border p-2 rounded focus:outline-none"
            value={message}
            ref={inputRef}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
