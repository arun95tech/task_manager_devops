function StatCard({ title, value, tone }) {
  return (
    <article className={`stat-card ${tone}`}>
      <div className="stat-icon">{title.slice(0, 1)}</div>
      <span>{title}</span>
      <strong>{value}</strong>
    </article>
  );
}

export default StatCard;
