import { BrowserRouter, Route, Routes } from 'react-router-dom'


import Layout from './pages/Layout'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ScrollToTop from './components/ScrollToTop'
import OrderSuccess from './pages/OrderSuccess'

import Alayout from './pages/admin/Layout'
import Auth from './pages/admin/Auth'
import Dashboard from './pages/admin/Dashboard'
import Orders from './pages/admin/Orders'
import Products from './pages/admin/Products'
import NewProduct from './pages/admin/NewProduct'
import Admins from './pages/admin/Admins'
import OrderDetails from './pages/admin/OrderDetails'
import AuthRoutes from './routes/AuthRoutes'
import GuestRoutes from './routes/GuestRoutes'
import EditProduct from './pages/admin/EditProduct'



function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='item/:id' element={<Product />} />
          <Route path='cart' element={<Cart />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='success' element={<OrderSuccess />} />
        </Route>
        
        <Route element={<GuestRoutes />}>
          <Route path='/admin' element={<Auth />} />
        </Route>

        <Route path='/admin' element={<Alayout />}>
          <Route element={<AuthRoutes />}>
            <Route path='/admin/dash' element={<Dashboard />} />
            <Route path='/admin/orders' element={<Orders />} />
            <Route path='/admin/orders/:id' element={<OrderDetails />} />
            <Route path='/admin/products' element={<Products />} />
            <Route path='/admin/products/new' element={<NewProduct />} />
            <Route path='/admin/products/:id' element={<EditProduct />} />
            <Route path='/admin/settings' element={<Admins />} />
          </Route>
        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App
