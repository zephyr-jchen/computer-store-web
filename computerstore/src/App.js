import "./App.css";
import Layout from "./components/layout";
import Home from "./pages/home";
import ProductDetails from "./pages/detail";
import ProductMgt from "./pages/product";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:slug" element={<ProductDetails />} />
        </Route>
        <Route path="/product" element={<ProductMgt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
