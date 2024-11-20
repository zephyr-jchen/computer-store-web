import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json"
import {Stack, Button} from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"

type CartItemProps = {
    id: number
    quantity: number
}

export function CartItem({id, quantity}:CartItemProps){
    const {removeFromCart} = useShoppingCart()
    const item = storeItems.find(item => item.id === id)
    if (item == null) return null

    return(
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.imgUrl} style = {{width: "130px", height:"80px", objectFit:"cover"}} />
            <div className="me-auto">
                <div>
                    {item.name}{"  "}
                    {
                        quantity >1 && (
                            <span className="text-muted" style={{fontSize:"0.7rem"}}>
                                x {quantity}
                            </span>
                        )
                    }
                </div>
                <div className="text-muted" style={{fontSize:"0.8rem"}}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div>{formatCurrency(item.price * quantity)}</div> 
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>&times;</Button>
        </Stack>
    )
}