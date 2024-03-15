import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Products from './components/Products.js';
import Orders from './components/Orders.js';
import AddEdit from './components/AddEdit.js';
import View from './components/View.js';
import Home from './components/Home.js';
import OrderView from './OrderFunctions/OrderView.js';
import OrderAddEdit from './OrderFunctions/OrderAddEdit.js';
import OrderHome from './OrderFunctions/OrderHome.js';
import Data from './components/Data.js';

function App() {
  return (
    <div className="App">
      <Router>
      <Dashboard />
        <Routes>
          <Route path="/" element={<Data />} />
          <Route path="/data" element={<Data />} />
          <Route path="/product" element={<Products />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/addedit" element={<AddEdit />} />
          <Route path="/addedit/:id" element={<AddEdit />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addeditorder" element={<OrderAddEdit />} />
          <Route path="/addeditorder/:id" element={<OrderAddEdit />} />
          <Route path="/vieworder/:id" element={<OrderView />} />
          <Route path="/homeorder" element={<OrderHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
