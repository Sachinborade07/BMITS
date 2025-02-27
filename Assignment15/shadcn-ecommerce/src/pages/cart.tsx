// pages/cart.tsx
import { useCart } from '@/contexts/cart-context'
import { Button } from '@/components/ui/button'

export default function Cart() {
    const { state } = useCart()

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Your Cart</h1>
            {state.items.map(item => (
                <div key={item.id} className="flex justify-between items-center border p-4 rounded">
                    <div>
                        <h3 className="font-medium">{item.product.title}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <p>Total: ${(item.quantity * item.product.price).toFixed(2)}</p>
                    </div>
                    <Button variant="destructive">Remove</Button>
                </div>
            ))}
        </div>
    )
}