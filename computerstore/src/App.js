import "./App.css";
import Layout from "./components/layout";
import Login from './pages/login';
import Register from './pages/register';
import Home from "./pages/home";
import ProductDetails from "./pages/detail";
import ProductMgt from "./pages/product";
import Checkout from "./pages/checkout";
import Payment from "./pages/payment";
import { products as initialProducts } from "./productitems";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/ProtectedRoute';


function App() {
  const [products, setProducts] = useState(initialProducts);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home products={products} />} />
          <Route path=":slug" element={<ProductDetails />} />
          <Route
            path="product"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <ProductMgt products={products} setProducts={setProducts} />
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;