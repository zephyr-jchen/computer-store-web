import {Card, Button} from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import "../App.css"
import { useShoppingCart } from "../context/ShoppingCartContext"

type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

export function StoreItem({id, name, price, imgUrl}:StoreItemProps){
    const {getItemQuantity, increaseCartQuantity,decreaseCartQuantity,removeFromCart} = useShoppingCart()
    const quantity = getItemQuantity(id)
    
    return <Card className="h-100">
        <Card.Img variant="top" src={imgUrl} height="300px" style={{objectFit:"cover"}} />
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                <span className="fs-2">{name}</span>
                <span className="ms-2 text-muted">{formatCurrency(price)}</span>
            </Card.Title>
            <div className="mt-auto">
                {quantity === 0? (
                    // if quantity is 0, display add to cart button
                    <Button className="w-100" onClick={()=> increaseCartQuantity(id)}>Add To Cart</Button>
                ):(
                    // if quantity is not 0, display item quantity, +/- and remove button
                    <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                        <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                            <Button className="btn-qty" onClick={()=> decreaseCartQuantity(id)}>-</Button>
                            <span className="fs-3">{quantity}</span>
                            <Button className="btn-qty" onClick={()=> increaseCartQuantity(id)}>+</Button>
                        </div>
                        <Button variant="danger" size="sm" onClick={()=> removeFromCart(id)}>
                            Remove from Cart
                        </Button>
                    </div>
                )}
            </div>
        </Card.Body>

    </Card>
}