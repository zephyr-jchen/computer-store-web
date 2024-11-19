import {Routes, Route} from "react-router-dom"
import {Container} from "react-bootstrap"
import {Home} from "./pages/Home"
import { ProductManagement } from "./pages/ProductManagement"
import { CustomerManagement } from "./pages/CustomerManagement"
import {Navbar} from "./components/Navbar"

function App() {
  return (
  <>
    <Navbar />
    <Container className="mb-4">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<ProductManagement />} />
      <Route path="/customer" element={<CustomerManagement />} />
    </Routes>
  </Container>
  </>
  )
}

export default App
