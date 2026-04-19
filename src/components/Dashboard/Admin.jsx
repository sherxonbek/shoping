import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { PlusCircle, Trash2 } from 'lucide-react';
import Sidebars from './Sidebar';
import { useNavigate } from 'react-router-dom';

// Cament yozib organaylikchi qanday bolar ekan😉


function Admin() {
  const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);

    const URL = 'https://69e35b7f3327837a15530f71.mockapi.io/prodact' //prodact api bu
    const usersApi = 'https://69e352593327837a15530547.mockapi.io/users' //users api


    //  useEfect 

    useEffect(() => {
        const users = async () => {
            const res = await axios.get(usersApi);
            setUsers(res.data);
        }
        users();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get(URL);
            setProducts(res.data);
        };
        fetchProducts();
    }, []);

    //Jami prodact narxini olyotirmon
    const totalProdact = products.reduce((sum, item) => sum + Number(item.price), 0);
    //Prodactlar soni
    const totalNextProdact = products.length;
    //Userlar soni
    const user = users.length;

    //qisqasi prodact delete funk
    const deleteProduct = async (id) => {

        try {
            await axios.delete(`${URL}/${id}`);

            setProducts(prevProducts => prevProducts.filter(p => p.id !== id));

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-900 text-slate-100">
            {/* SideBar bolimi  */}
            <Sidebars />

            {/* Qisqasi SideBar tugadi endi Menu */}
            <menu className="flex-1 p-8 overflow-y-auto relative menu">

                {/* Maxsulot va User xaqida qisqacha ma`lumot */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold">Mahsulotlar boshqaruvi</h2>
                    </div>
                    <button onClick={() => navigate('/admin/prodact/add')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-blue-900/40">
                        <PlusCircle className='text-[20px]' /> Yangi qo'shish
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-6 mb-8 text-black">
                    <div className="bg-white p-6 rounded-2xl border border-slate-800 shadow-sm">
                        <p className="text-slate-500 font-bold uppercase text-xs tracking-wider">Jami Savdo</p>
                        <h3 className="text-2xl font-black text-slate-800 mt-1">${totalProdact}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-800 shadow-sm">
                        <p className="text-slate-500 font-bold uppercase text-xs tracking-wider">Jami Prodact</p>
                        <h3 className="text-2xl font-black text-slate-800 mt-1">{totalNextProdact} ta</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-800 shadow-sm">
                        <p className="text-slate-500 font-bold uppercase text-xs tracking-wider">Jami User</p>
                        <h3 className="text-2xl font-black text-slate-800 mt-1">{user} ta</h3>
                    </div>
                </div>

                {/* Maxsulotlar jamlanmasi */}
                <div className='bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden'>
                    <div className="w-full text-left">

                        {/* Maxsulot malumoti */}
                        <div className="bg-slate-900/50 h-16 text-slate-400 text-sm border-b border-slate-800">
                            <div className='flex justify-between text-center items-center'>
                                <div className='flex gap-6'>
                                    <div className='p-4 font-semibold text-left'>Rasm</div>
                                    <div className='p-4 font-semibold'>Nomi</div>
                                </div>
                                <div className='flex'>
                                    <div className="p-4 font-semibold text-right">Narxi</div>
                                    <div className="p-4 font-semibold">Delete</div>
                                </div>
                            </div>
                        </div>
                        {/* Maxsulotlar */}
                        <div className=" ">
                            {products.map((p) => (
                                <div key={p.id} className="flex text-center items-center justify-between hover:bg-slate-900/30 transition border border-gray-800 rounded-sm">
                                    <div className='flex items-center'>
                                        <div className="p-4">
                                            <img src={p.photo} alt="" className="w-12 h-12 rounded-lg object-cover border border-slate-800" />
                                        </div>
                                        <div className="p-4 font-medium">{p.title}</div>
                                    </div>
                                    <div className='flex items-center gap-10 text-right mr-4'>
                                        <div>${p.price}</div>
                                        <div>
                                            <button className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition" onClick={() => deleteProduct(p.id)}>
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </menu>

            <div className=''>

            </div>
        </div>
    )
}

export default memo(Admin)