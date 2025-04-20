import { useRef, useEffect } from "react";
import Message from "./Message";

function ChatBox({ chat, username }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="h-[70vh] overflow-y-auto p-4 bg-gray-800 rounded-xl shadow mb-4">
      {chat.map((msg, index) => (
        <Message key={index} message={msg} currentUser={username} />
      ))}
      <div ref={scrollRef} />
    </div>
  );
}

export default ChatBox;
