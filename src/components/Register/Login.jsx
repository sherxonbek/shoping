import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://69e352593327837a15530547.mockapi.io/users');
      const users = await response.json();

      const foundUser = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      const isAdmin = formData.email === "Sherxon@gmail.com" && formData.password === "Sherxon2128";

      if (foundUser) {
        localStorage.setItem('id', foundUser.id);
        navigate('/dashboard');
        window.location.reload();
      } else if (isAdmin) {
        navigate('/admin');
      } else {
        setError("Email yoki parol noto'g'ri!");
      }
    } catch (err) {
      setError("Server bilan aloqa uzildi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 text-black">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Tizimga kirish</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-black"
              placeholder="misol@gmail.com"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Parol</label>
            <input
              name="password"
              type="password"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-black"
              placeholder="••••••••"
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-bold transition ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            }`}
          >
            {loading ? "Tekshirilmoqda..." : "Kirish"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Hisobingiz yo'qmi?{' '}
          <button onClick={() => navigate('/')} className="text-blue-600 font-semibold hover:underline">
            Ro'yxatdan o'ting
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
