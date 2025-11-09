import React from "react";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <h2>LinkedIn Clone</h2>
      {user && (
        <div className="nav-right">
          <span>👋 {user.name}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
