import { useEffect } from "react";

export default function CoachModal({ coach, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose}>
          Close
        </button>

        <span className="coach-avatar coach-avatar-large">
          {coach.name.charAt(0)}
        </span>
        <h2 className="modal-name">{coach.name}</h2>
        <p className="coach-company">{coach.company.name}</p>

        <div className="detail-list">
          <div className="detail-row">
            <span>Email</span>
            <a href={`mailto:${coach.email}`}>{coach.email}</a>
          </div>
          <div className="detail-row">
            <span>Phone</span>
            <span>{coach.phone}</span>
          </div>
          <div className="detail-row">
            <span>Website</span>
            <a href={`https://${coach.website}`} target="_blank" rel="noreferrer">
              {coach.website}
            </a>
          </div>
          <div className="detail-row">
            <span>Company</span>
            <span>{coach.company.name}</span>
          </div>
          <div className="detail-row">
            <span>Address</span>
            <span>
              {coach.address.street}, {coach.address.suite}, {coach.address.city}{" "}
              {coach.address.zipcode}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
