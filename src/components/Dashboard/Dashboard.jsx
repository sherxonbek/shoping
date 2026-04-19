import axios from 'axios';
import { Search, ShoppingCart } from 'lucide-react';
import { memo, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Dashboard() {
    const navigate = useNavigate();
    const [prodacts, setProdact] = useState([]);
    const [search, setSearch] = useState("");

    const URL = 'https://69e35b7f3327837a15530f71.mockapi.io/prodact'

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(URL);
                setProdact(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, []);

    console.log(prodacts);

    const filteredProducts = useMemo(() => {
        return prodacts.filter(prodacte =>
            prodacte.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [prodacts, search]);


    return (
        <div className="min-h-screen bg-slate-50">

            <Navbar />

            <main className="max-w-7xl mx-auto px-4">

                <div className='bg-white rounded-2xl p-4 shadow-sm'>
                    <form className='flex items-stretch justify-center max-w-2xl mx-auto h-[45px], border border-gray-300 border-r-0 rounded-l-xl focus:ring-2 focus:ring-blue-500 shadow-sm transition-all'>
                        <div className="relative flex flex-1 items-center">
                            <div className="absolute left-3">
                                <Search className="text-gray-400 w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Qidiruv..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-full pl-10 pr-4 focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="h-12 bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-r-xl font-semibold shadow-md active:scale-95 transition-all flex items-center justify-center"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-6">Mahsulotlarimiz</h1>

                {filteredProducts ? <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {filteredProducts.map((prodact) => (
                        <div key={prodact.id} className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all">
                            <div className="w-full h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                                <img
                                    src={prodact.photo}
                                    alt={prodact.title}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>

                            <h2 className="font-semibold truncate">{prodact.title}</h2>
                            <p className="text-blue-600 font-bold">${prodact.price}</p>
                            <button
                                onClick={() => navigate(`/product/${prodact.id}`)}
                                className='w-full flex items-center justify-center border p-2 rounded-xl gap-2 mt-4 border-blue-400 hover:bg-blue-600 hover:text-white transition-all'
                            >
                                <ShoppingCart size={18} />
                                Mahsulot
                            </button>
                        </div>
                    ))}
                </div>

                    : <div className='grid grid-cols-4 gap-6'>
                        {prodacts.map((prodact) => {
                            return (
                                <div key={prodact.id}>
                                    <div className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-full h-40 bg-gray-200 rounded-xl mb-4">
                                            <img src={prodact.photo} alt="" className='h-40 w-full rounded-xl' />
                                        </div>
                                        <h2 className="font-semibold">{prodact.title}</h2>
                                        <p className="text-blue-600 font-bold">${prodact.price}</p>
                                        <button onClick={() => navigate(`/product/${prodact.id}`)} className='flex border p-2 rounded-xl gap-2 mt-4 border-blue-400 hover:bg-blue-400 hover:border-blue-700 '><ShoppingCart />Mahsulot</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>}


                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-xl italic">Afsuski, hech narsa topilmadi...</p>
                    </div>
                )}


            </main>
        </div>
    )
}

export default memo(Dashboard)