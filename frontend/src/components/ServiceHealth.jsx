function ServiceHealth({ health }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>System Services</h2>
      </div>

      <div className="health-list">
        <div className="health-row">
          <span>User Service</span>
          <strong className={health.user ? "healthy" : "offline"}>
            {health.user ? "Healthy" : "Offline"}
          </strong>
        </div>
        <div className="health-row">
          <span>Task Service</span>
          <strong className={health.task ? "healthy" : "offline"}>
            {health.task ? "Healthy" : "Offline"}
          </strong>
        </div>
      </div>
    </section>
  );
}

export default ServiceHealth;
