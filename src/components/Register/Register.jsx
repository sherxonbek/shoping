import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://69e352593327837a15530547.mockapi.io/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, createdAt: new Date().toISOString() })
            });

            if (response.ok) {
                setShowSuccessModal(true);
            }
        } catch (error) {
            alert("Xatolik yuz berdi!");
        } finally {
            setLoading(false);
        }
    };

    const handleOk = () => {
        setShowSuccessModal(false);
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Ro'yxatdan o'tish</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="fullName"
                        type="text"
                        placeholder="To'liq ismingiz"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        onChange={handleChange}
                        value={formData.fullName}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        onChange={handleChange}
                        value={formData.email}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Parol"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        onChange={handleChange}
                        value={formData.password}
                    />
                    <button
                        disabled={loading}
                        className={`w-full py-2 rounded-lg text-white font-bold transition ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {loading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
                    </button>
                </form>
            </div>

            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                            ✓
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Tabriklaymiz!</h3>
                        <p className="text-gray-600 mb-6">Ro'yxatdan o'tish muvaffaqiyatli yakunlandi.</p>
                        <button
                            onClick={handleOk}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition"
                        >
                            OK
                        </button>



                    </div>

                </div>

            )}
            <p className="mt-6 text-center text-sm text-gray-600">
                Hisobingiz bormi?{' '}
                <button onClick={() => navigate('/login')} className="text-blue-600 font-semibold hover:underline">
                    Kirish
                </button>
            </p>
        </div>
    );
};

export default Register;
