export default function CoachCard({ coach, onSelect }) {
  return (
    <button type="button" className="coach-card" onClick={() => onSelect(coach)}>
      <span className="coach-avatar">{coach.name.charAt(0)}</span>
      <h2 className="coach-name">{coach.name}</h2>
      <p className="coach-city">{coach.address.city}</p>
      <p className="coach-company">{coach.company.name}</p>
    </button>
  );
}
