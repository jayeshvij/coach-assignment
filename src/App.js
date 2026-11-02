import { useEffect, useState } from "react";
import CoachCard from "./CoachCard";
import CoachModal from "./CoachModal";
import "./App.css";

const COACHES_URL = "https://jsonplaceholder.typicode.com/users";

export default function App() {
  const [coaches, setCoaches] = useState([]);
  const [status, setStatus] = useState("loading");
  const [query, setQuery] = useState(() => {
    return new URLSearchParams(window.location.search).get("q") || "";
  });
  const [sortBy, setSortBy] = useState("name");
  const [selectedCoach, setSelectedCoach] = useState(null);

  useEffect(() => {
    fetch(COACHES_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data) => {
        setCoaches(data);
        setStatus("ready");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set("q", query);
    } else {
      url.searchParams.delete("q");
    }
    window.history.replaceState(null, "", url);
  }, [query]);

  const trimmedQuery = query.trim().toLowerCase();

  const visibleCoaches = coaches
    .filter((coach) => coach.name.toLowerCase().includes(trimmedQuery))
    .sort((a, b) => {
      if (sortBy === "city") {
        return a.address.city.localeCompare(b.address.city);
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="page">
      <header className="page-header">
        <h1>Coach Directory</h1>
      </header>

      <div className="toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Search coaches by name"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="sort-select"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="name">Sort by name</option>
          <option value="city">Sort by city</option>
        </select>
      </div>

      {status === "loading" && (
        <p className="state-message">Loading coaches...</p>
      )}

      {status === "error" && (
        <div className="state-message">
          <p>Could not load coaches.</p>
          <p>Check your connection and refresh the page to try again.</p>
        </div>
      )}

      {status === "ready" && visibleCoaches.length === 0 && (
        <div className="state-message">
          <svg
            className="empty-icon"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="16"
              y1="16"
              x2="21"
              y2="21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p>No coaches match "{query.trim()}".</p>
          <button type="button" className="clear-button" onClick={() => setQuery("")}>
            Clear search
          </button>
        </div>
      )}

      {status === "ready" && visibleCoaches.length > 0 && (
        <div className="coach-grid">
          {visibleCoaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} onSelect={setSelectedCoach} />
          ))}
        </div>
      )}

      {selectedCoach && (
        <CoachModal coach={selectedCoach} onClose={() => setSelectedCoach(null)} />
      )}
    </div>
  );
}
