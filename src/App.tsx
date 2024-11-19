import {Routes, Route} from "react-router-dom"
import {Container} from "react-bootstrap"
import {Home} from "./pages/Home"
import { ProductManagement } from "./pages/ProductManagement"
import { CustomerManagement } from "./pages/CustomerManagement"
import {Navbar} from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

function App() {
  return (
  <ShoppingCartProvider>
    <Navbar />
    <Container className="mb-4">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<ProductManagement />} />
      <Route path="/customer" element={<CustomerManagement />} />
    </Routes>
  </Container>
  </ShoppingCartProvider>
  )
}

export default App
