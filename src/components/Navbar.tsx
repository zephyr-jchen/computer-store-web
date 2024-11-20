import {Container, Button, Nav, Navbar as NavbarBs} from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"


export function Navbar(){
    const {openCart, cartQuantity} = useShoppingCart()

    return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
            <Nav className="me-auto">
                <Nav.Link to="/" as={NavLink}>
                Home
                </Nav.Link>
                <Nav.Link to="/customer" as={NavLink}>
                Customer
                </Nav.Link>
                <Nav.Link to="/product" as={NavLink}>
                Product
                </Nav.Link>
            </Nav>
            <Button onClick={openCart}
            style={{width:"3rem", height:"3rem", backgroundColor:"lightgray", position:"relative"}}
            className="rounded-circle">🛒
                <div className="rounded-circle bg-danger d-flex justify-content-center
                align-items-center"
                style={{
                    color:"white",
                    width: "1.5rem",
                    height: "1.5rem",
                    position:"absolute",
                    bottom:0,
                    right:0,
                    transform:"translate(20%,20%)",
                }}>{cartQuantity}</div>
            </Button>
        </Container>
    </NavbarBs>
    )
}