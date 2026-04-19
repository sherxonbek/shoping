import React, { useEffect, useState } from 'react'
import Logo from '../imgs/logo.png'
import { ShoppingBasket } from 'lucide-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const id = localStorage.getItem('id');
        if (id) {
            const fetchUserData = async () => {
                try {
                    const res = await axios.get(`https://69e352593327837a15530547.mockapi.io/users/${id}`);
                    setUser(res.data);
                } catch (error) {
                    console.error("User ma'lumotlarini yuklashda xato:", error);
                }
            };
            fetchUserData();
        }
    }, []);

    return (
        <nav className="flex justify-between items-center bg-white shadow-md h-16 mb-8 px-4 sticky top-0 z-50 max-w-[1248px] m-auto">
            <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate('/dashboard')}>
                <img src={Logo} alt="SherXon Logo" className='h-12 w-12 rounded-xl object-cover' />
                <div className='hidden sm:block leading-none'>
                    <h1 className='font-bold text-xl text-blue-800'>SherXon</h1>
                    <p className='font-mono text-xs text-gray-500'>Market</p>
                </div>
            </div>

            <div className='flex items-center gap-3 sm:gap-6'>
                <div className="relative cursor-pointer hover:text-blue-600 transition-colors">
                    <ShoppingBasket size={28} strokeWidth={1.5} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
                </div>

                {user ? (
                    <div className="flex items-center gap-3 bg-gray-50 p-1 pr-3 rounded-full border border-gray-200">
                        <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold shadow-sm">
                            {user.fullName?.charAt(0).toUpperCase()}
                        </div>

                        <div className="hidden md:flex flex-col">
                            <span className="text-[9px] text-gray-400 font-mono font-bold leading-none">
                                ID: {user.id}
                            </span>
                            <span className="text-sm font-bold text-gray-800">
                                {user.fullName}
                            </span>
                        </div>
                    </div>
                ) : (
                    <button 
                        onClick={() => navigate('/login')}
                        className="text-sm font-bold text-blue-600 border border-blue-600 px-4 py-1.5 rounded-full hover:bg-blue-600 hover:text-white transition-all"
                    >
                        Kirish
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Navbar
