function RecentActivity({ activities }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Recent Activity</h2>
      </div>

      <div className="activity-list">
        {activities.length === 0 ? (
          <p className="muted-text">No activity yet. Create or update a task.</p>
        ) : (
          activities.map((activity) => (
            <div className="activity-item" key={activity.id}>
              <span>{activity.type.slice(0, 1)}</span>
              <div>
                <strong>{activity.type}</strong>
                <p>{activity.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default RecentActivity;
