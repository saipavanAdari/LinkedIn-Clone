import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginUser(form);
      const { user, token } = res.data;
      sessionStorage.setItem('auth', JSON.stringify({ user, token }));
      setUser(user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-brand"><h1>LinkedIn Clone</h1></div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Email</label>
            <input className="input" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value })} required />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input className="input" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value })} required />
          </div>
          {error && <p style={{color:'red'}}>{error}</p>}
          <div className="auth-actions">
            <button className="button block" type="submit">Login</button>
          </div>
        </form>
        <p style={{marginTop:12}}>Don't have an account? <Link to="/signup" className="link">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
