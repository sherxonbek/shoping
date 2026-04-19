import { memo, useEffect, useState } from "react";
import Sidebars from "./Sidebar"
import axios from "axios";

function AddProdact() {

    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [createProduct, setcreateProduct] = useState({
        title: '',
        price: '',
        photo: '',
        discription: ''
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setcreateProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const add = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(URL, createProduct);
            setProducts([...products, response.data]);
            setcreateProduct({ title: '', price: '', photo: '', discription: '' });

            alert("Mahsulot qo'shildi!");
        } catch (err) {
            console.log("Xato yuz berdi:", err);
        }

    }

    return (
        <div className=" flex min-h-screen bg-slate-900 text-slate-100">

            <Sidebars />

            <div className="w-5/6 flex flex-col items-center">
                <div className="grid grid-cols-3 gap-6 mb-8 text-black h-min ml-12 mt-8">
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

                <div className="flex flex-col border-gray-500 border rounded-xl w-3xl h-auto justify-center items-center">
                    <form onSubmit={add} className="p-2 w-full flex flex-col items-center">
                        <div className="w-full">
                            <div className="p-2">
                                <h1 className="text-cyan-500">Img Url(Link)</h1>
                                <input
                                    type="text"
                                    name="photo"
                                    value={createProduct.photo}
                                    onChange={handleInputChange}
                                    className="focus:outline-none border rounded-2xl  border-gray-700 w-full p-1.5 text-sm text-cyan-600"
                                    placeholder="Image Url..." />
                            </div>
                            <div className="p-2">
                                <h1 className="text-cyan-500">Title</h1>
                                <input
                                    type="text"
                                    name="title"
                                    value={createProduct.title}
                                    onChange={handleInputChange}
                                    className="focus:outline-none border rounded-2xl  border-gray-700 w-full p-1.5 text-sm text-cyan-600"
                                    placeholder="Title name..." />
                            </div>
                            <div className="p-2">
                                <h1 className="text-cyan-500">Price</h1>
                                <input
                                    type="number"
                                    name="price"
                                    value={createProduct.price}
                                    onChange={handleInputChange}
                                    className="focus:outline-none border rounded-2xl  border-gray-700 w-full p-1.5 text-sm text-cyan-600"
                                    placeholder="Price..." />
                            </div>
                            <div className="p-2">
                                <h1 className="text-cyan-500">Dicription</h1>
                                <input
                                    type="text"
                                    name="discription"
                                    value={createProduct.discription}
                                    onChange={handleInputChange}
                                    className="focus:outline-none border rounded-2xl  border-gray-700 w-full p-1.5 text-sm text-cyan-600"
                                    placeholder="Dicription..." />
                            </div>
                        </div>
                        <button type="submit" className="border border-blue-800 bg-blue-600 rounded w-min px-2 mb-4">Save</button>

                    </form>
                </div>
            </div>


        </div>

    )
}

export default memo(AddProdact)