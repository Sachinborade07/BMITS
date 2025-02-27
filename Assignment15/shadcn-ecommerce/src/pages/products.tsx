// pages/products.tsx
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { getProducts } from '@/api/products'
import { useCart } from '@/contexts/cart-context'

export default function Products() {
    const { data: products, isLoading } = useQuery({ queryKey: ['products'], queryFn: getProducts })
    const { dispatch } = useCart()

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product: Product) => (
                <Card key={product.id}>
                    <CardHeader>
                        <CardTitle>{product.title}</CardTitle>
                        <CardDescription>${product.price}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <img src={product.image} alt={product.title} className="h-48 object-contain" />
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}>
                            Add to Cart
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}