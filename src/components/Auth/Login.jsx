import { useState } from 'react';
import './auth.css';

function Login({ onLogin, onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Here we would typically make an API call to authenticate
    // For now, we'll simulate a successful login
    try {
      onLogin({
        name: 'User',
        email: email
      });
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Login to Todoshka</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="auth-button">Login</button>
        </form>
        
        <div className="auth-links">
          <p>
            Don't have an account?{' '}
            <button 
              className="text-link" 
              onClick={() => onNavigate('register')}
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;