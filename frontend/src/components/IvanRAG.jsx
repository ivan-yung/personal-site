import React, { useEffect, useRef, useState } from "react";
import "../styles/IvanRAG.css"; // We'll use the new styles

const STORAGE_KEY = "ivanrag_chat_history";

// SVG icon for the send button
const SendIcon = ({ disabled }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`ivanrag-send-icon ${disabled ? "disabled" : ""}`}
  >
    <path
      d="M10 14L2 12L10 10L12 2L14 10L22 12L14 14L12 22L10 14Z"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

function IvanRAG() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listRef = useRef(null);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMessages(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load chat history:", e);
    }
  }, []);

  // Persist history and scroll to bottom
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error("Failed to save chat history:", e);
    }
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (role, text) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), role, text, ts: new Date().toISOString() },
    ]);
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    setError(null);
  };

  const send = async () => {
    const trimmed = message.trim();
    if (!trimmed || loading) return;
    setError(null);
    addMessage("user", trimmed);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server returned ${res.status}: ${text}`);
      }

      const data = await res.json();
      const reply = data.reply ?? "(no reply)";
      addMessage("bot", reply);
    } catch (err) {
      console.error("Chat request failed:", err);
      const errorMessage = err.message || String(err);
      setError(errorMessage);
      addMessage("bot", `Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="ivanrag-root">
      <div className="ivanrag-header">
        <h2 className="ivanrag-title">Chat with Ivan</h2>
        <button className="ivanrag-clear-button" onClick={clearHistory}>
          Clear History
        </button>
      </div>

      <div ref={listRef} className="ivanrag-list" aria-live="polite">
        {messages.length === 0 && <div className="ivanrag-empty">Ask a question to get started!</div>}
        {messages.map((m) => (
          <div key={m.id} className={`ivanrag-message-row ${m.role}`}>
            <div className={`ivanrag-bubble ${m.role}`}>
              <div className="ivanrag-sender">{m.role === "user" ? "You" : "Ivan"}</div>
              <div>{m.text}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="ivanrag-message-row bot">
             <div className="ivanrag-bubble bot typing-indicator">
                <span></span><span></span><span></span>
             </div>
          </div>
        )}
      </div>

      <div className="ivanrag-controls">
        <textarea
          className="ivanrag-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Why should I hire you?"
          aria-label="Chat message"
          disabled={loading}
        />
        <button className="ivanrag-send-button" onClick={send} disabled={loading || !message.trim()} aria-label="Send message">
          <SendIcon disabled={loading || !message.trim()} />
        </button>
      </div>

      {error && (
        <div className="ivanrag-error">
          <strong>Error:</strong> {error}
          <div className="ivanrag-hint">
            Ensure the backend at <code>http://127.0.0.1:8000</code> is running.
          </div>
        </div>
      )}
    </div>
  );
}

export default IvanRAG;