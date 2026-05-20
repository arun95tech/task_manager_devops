function Topbar({ user, searchTerm, onSearchChange, onLogout }) {
  return (
    <header className="topbar">
      <label className="search-box">
        <span>Search</span>
        <input
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title, description, assigned user, or status..."
        />
      </label>

      <button className="icon-button" type="button" aria-label="Notifications">
        Bell
      </button>

      <div className="profile">
        <div className="avatar">{user.username?.slice(0, 1).toUpperCase()}</div>
        <div>
          <strong>{user.username}</strong>
          <span>{user.email || "No email added"}</span>
        </div>
      </div>

      <button className="logout-button" type="button" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
}

export default Topbar;
