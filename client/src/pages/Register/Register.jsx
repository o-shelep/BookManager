import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Library, Target, BarChart2, Bookmark } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../Login/Login.scss';
import './Register.scss';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim() || !confirm.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }
    setLoading(true);
    try {
      await register(username.trim(), password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__left">
        <div className="auth-page__decoration">
          <div className="deco-brand">
            <Library size={36} className="deco-icon" />
            <h1>BookShelf</h1>
          </div>
          <p>Join thousands of readers who track and organize their reading journey.</p>
        </div>
        <div className="auth-page__features">
          <div className="auth-page__feature">
            <Target size={20} className="feature-icon" />
            <span className="feature-text">Set reading goals for yourself</span>
          </div>
          <div className="auth-page__feature">
            <BarChart2 size={20} className="feature-icon" />
            <span className="feature-text">See your reading statistics</span>
          </div>
          <div className="auth-page__feature">
            <Bookmark size={20} className="feature-icon" />
            <span className="feature-text">Never lose track of a book again</span>
          </div>
        </div>
      </div>

      <div className="auth-page__right">
        <div className="auth-page__form-container">
          <div className="auth-page__form-header">
            <h2>Create account</h2>
            <p>Start your reading journey today</p>
          </div>

          {error && <div className="auth-page__error">{error}</div>}

          <form className="auth-page__form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                id="confirm"
                type="password"
                placeholder="Repeat your password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className="auth-page__submit"
              disabled={loading}
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <div className="auth-page__footer">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
