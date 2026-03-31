import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#569cd6] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CF</span>
            </div>
            <span className="text-white text-2xl font-semibold">CollabForge</span>
          </div>
          <p className="text-[#858585] text-sm">Real-time collaborative code editor</p>
        </div>

        <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-8">
          <h2 className="text-white text-xl font-semibold mb-6">Create account</h2>

          {error && (
            <div className="bg-[#3e1414] border border-[#f44747] text-[#f44747] text-sm px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[#858585] text-xs uppercase tracking-wider mb-1 block">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#3c3c3c] border border-[#3e3e42] text-white px-3 py-2 rounded focus:outline-none focus:border-[#569cd6] text-sm"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="text-[#858585] text-xs uppercase tracking-wider mb-1 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[#3c3c3c] border border-[#3e3e42] text-white px-3 py-2 rounded focus:outline-none focus:border-[#569cd6] text-sm"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="text-[#858585] text-xs uppercase tracking-wider mb-1 block">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full bg-[#3c3c3c] border border-[#3e3e42] text-white px-3 py-2 rounded focus:outline-none focus:border-[#569cd6] text-sm"
                placeholder="Min 6 characters"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0e639c] hover:bg-[#1177bb] text-white py-2 rounded text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="text-[#858585] text-sm text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#569cd6] hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}