import { useState, useEffect } from "react";

export default function AppStatus({ loading, error, status }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (loading) {
      setMessage("Loading weather...");
    } else if (error) {
      setMessage(`Error: ${error}`);
    } else {
      setMessage("");
    }
  }, [loading, error]);

  if (!loading && !error) return null;

  return (
    <section className="flex flex-col items-center justify-center p-4">
      <div
        className={`text-center ${error ? "text-red-400" : "text-blue-400"}`}
      >
        {message}
      </div>
    </section>
  );
}
