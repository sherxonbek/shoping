import { Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Register/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Admin from './components/Dashboard/Admin';
import Prodact from './components/Dashboard/Prodact';
import AddProdact from './components/Dashboard/AddProdact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/prodact/add" element={<AddProdact />} />
      <Route path="/product/:productId" element={<Prodact />} />
    </Routes>
  );
}

export default App;
