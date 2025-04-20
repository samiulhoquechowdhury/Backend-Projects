function Message({ message, currentUser }) {
  const isSelf = message.username === currentUser;

  return (
    <div className={`flex ${isSelf ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`rounded-lg px-4 py-2 max-w-xs break-words shadow ${
          isSelf ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {!isSelf && (
          <p className="text-xs font-bold mb-1">{message.username}</p>
        )}
        <p>{message.message}</p>
      </div>
    </div>
  );
}

export default Message;
