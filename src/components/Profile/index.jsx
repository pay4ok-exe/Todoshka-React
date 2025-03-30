import { useState } from 'react';
import './profile.css';

function Profile({ user }) {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically update the user data via API
    // For now we'll just toggle edit mode off
    setEditMode(false);
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      
      {editMode ? (
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-button">Save Changes</button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <div className="info-group">
            <span className="info-label">Name:</span>
            <span className="info-value">{userData.name}</span>
          </div>
          
          <div className="info-group">
            <span className="info-label">Email:</span>
            <span className="info-value">{userData.email}</span>
          </div>
          
          <div className="profile-stats">
            <div className="stat-box">
              <span className="stat-value">12</span>
              <span className="stat-label">Total Tasks</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">8</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">4</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
          
          <button 
            className="edit-button"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;