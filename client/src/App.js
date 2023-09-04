import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Create from './components/create/Create';
import PizzaDetails from './components/pizzaDetails/PizzaDetails';
import PizzaCatalog from './components/pizzaCatalog/PizzaCatalog';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/create' element={<Create />} />
        <Route path='/pizza/:id' element={<PizzaDetails />} />
        <Route path='/pizzas/:id' element={<PizzaCatalog />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
