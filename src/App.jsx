import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import Home from "./pages/Home"
import Category from './pages/Category';
import AllProduct from './pages/products/AllProduct';
import AddProduct from './pages/products/AddProduct';
import EditProduct from './pages/products/EditProduct';
import Customer from './pages/Customer';
import Ads from './pages/Ads';
import OrderList from './pages/order/OrderList';
import DeliveredOrderList from './pages/order/DeliveredOrderList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product/all" element={<AllProduct />} />
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/customer-list" element={<Customer />} />
        <Route path="/order/new-order-list" element={<OrderList />} />
        <Route path="/order/delivered-order-list" element={<DeliveredOrderList />} />
      </Routes>
    </Router>
  );
}

export default App;
