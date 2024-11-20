import {Offcanvas, Stack, Button} from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { CartItem } from "./CartItem"
import { formatCurrency } from "../utilities/formatCurrency"
import storeItems from "../data/items.json"

type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({isOpen}: ShoppingCartProps){
    const {closeCart, cartItems} = useShoppingCart()
    
    const shippingFee = 6.99

    const subtotal = cartItems.reduce((subtotal,cartItem) =>{
        const item = storeItems.find(i => i.id === cartItem.id)
        return subtotal + (item?.price || 0) * cartItem.quantity
    },0)

    const total = subtotal * 1.13 + shippingFee

    return <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>
            Cart
            </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map(item =>(
                    <CartItem key={item.id} {...item}/>
                ))}
                <div className="ms-auto fs-5">
                    Subtotal {formatCurrency(subtotal)}
                </div>
                <div className="ms-auto fs-5">Shipping {formatCurrency(shippingFee)}</div>
                <div className="ms-auto fw-bold fs-5">
                    Total {formatCurrency(total)}
                </div>
                <Button>Pay Now</Button>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
}