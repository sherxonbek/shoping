import axios from 'axios';
import { ShoppingBag } from 'lucide-react';
import React, { memo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Prodact() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [prodact, setProdact] = useState({});
    const [count, setCount] = useState(0);


    const URL = `https://69e35b7f3327837a15530f71.mockapi.io/prodact/${productId}`

    useEffect(() => {
        const getSingleProduct = async () => {
            try {
                const res = await axios.get(URL);
                setProdact(res.data);
            } catch (error) {
                console.log("Xatolik:", error);
            }
        };
        getSingleProduct();
    }, [productId]);

    return (
        <div className="p-10 text-black bg-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Mahsulot sahifasi</h1>

            <div className="p-8 bg-zinc-50 rounded-2xl border border-zinc-200 shadow-lg flex flex-col md:flex-row gap-10 items-center md:items-start">

                <div className="bg-white p-4 rounded-xl shadow-md">
                    <img
                        src={prodact.photo}
                        alt={prodact.title}
                        className='w-72 h-auto rounded-lg object-cover'
                    />
                </div>

                <div className="flex-1 space-y-4">
                    <h2 className="text-4xl font-extrabold text-zinc-900">{prodact.title}</h2>

                    <p className="text-2xl font-bold text-blue-600">
                        Narxi: ${prodact.price}
                    </p>

                    <div className="pt-4 border-t border-zinc-200">
                        <h1 className='font-bold'>Mahsulot haqida</h1>
                        <p className="text-zinc-700 leading-relaxed">
                            {prodact.discription}
                        </p>
                    </div>
                    <div className='flex gap-6'>
                        <button
                            onClick={() => navigate(`/dashboard`)}
                            className="mt-6 px-6 py-2 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition"
                        >
                            Orqaga qaytish
                        </button>
                        <button
                            onClick={() => setCount(count + 1)}
                            className="flex gap-2 mt-6 px-6 py-2 bg-blue-700 text-white rounded-xl relative"
                        >
                            <ShoppingBag />
                            Savat

                            <span className={`${count === 0 ? 'hidden' : 'flex'} absolute -top-2 -right-2 bg-red-600 w-6 h-6 items-center justify-center rounded-full text-[10px]`}>
                                {count}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default memo(Prodact);
