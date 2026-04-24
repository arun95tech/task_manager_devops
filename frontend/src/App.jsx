function App() {
  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body text-center">
          <h1 className="mb-3">Task Management System</h1>
          <p className="lead">
            Frontend service is running successfully.
          </p>

          <div className="row mt-4">
            <div className="col-md-4 mb-3">
              <div className="border rounded p-3">
                <h5>User Service</h5>
                <p className="text-muted">Port 8000</p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="border rounded p-3">
                <h5>Task Service</h5>
                <p className="text-muted">Port 8001</p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="border rounded p-3">
                <h5>Frontend</h5>
                <p className="text-muted">Port 3000</p>
              </div>
            </div>
          </div>

          <p className="mt-4">
            DevOps Flow: GitHub → Jenkins → Docker → Registry → Kubernetes → AWS EKS
          </p>
        </div>
      </div>
    </div>
  )
}

export default App