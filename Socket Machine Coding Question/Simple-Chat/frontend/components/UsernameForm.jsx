function UsernameForm({ setUsername }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.username.value.trim();
    if (input !== "") {
      setUsername(input);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Enter your username
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Your name"
            className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
}

export default UsernameForm;
