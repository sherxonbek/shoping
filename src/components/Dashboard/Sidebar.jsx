import { LayoutDashboard, LogOut, Package, Users } from 'lucide-react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebars() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');

    const menuItems = [
        { path: '/admin', name: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/prodact/add', name: 'Mahsulotlar', icon: Package },
        // { path: '/users', name: 'Mijozlar', icon: Users },
    ];

    return (
        <div className='w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col h-screen sticky top-0 justify-between'>
            <div>
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">A</div>
                    <div>
                        <h1 className="text-xl font-black tracking-tight text-white">ADMIN PANEL</h1>
                    </div>
                </div>

                <h1 className='font-serif text-slate-400 mb-6'>Xush Kelibsan SherXon</h1>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <div
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border ${isActive
                                        ? 'bg-blue-600/10 text-blue-500 border-blue-600/20'
                                        : 'text-slate-400 hover:bg-slate-900 border-transparent'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </div>
                        );
                    })}
                </nav>

                {/* <nav className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-blue-600/10 text-blue-500 rounded-xl border border-blue-600/20 cursor-pointer">
                        <LayoutDashboard className='text-[20px]' /> <span className="font-semibold">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-900 rounded-xl transition cursor-pointer">
                        <Package className='text-[20px]' /> <span>Mahsulotlar</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-900 rounded-xl transition cursor-pointer">
                        <Users className='text-[20px]' /> <span>Mijozlar</span>
                    </div>
                </nav> */}
            </div>
            <div onClick={() => navigate('/dashboard')} className='ml-2 flex gap-4 text-red-700 cursor-context-menu'><LogOut /> Chiqish</div>
        </div>
    )
}

export default Sidebars
