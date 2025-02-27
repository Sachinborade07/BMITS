import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { useUser } from '../contexts/user-context'

export function Navbar() {
    const { state, dispatch } = useUser()

    return (
        <nav className="border-b">
            <div className="container flex items-center justify-between h-16">
                <Link to="/" className="text-xl font-bold">
                    Ecommerce
                </Link>
                <div className="flex items-center gap-4">
                    <Link to="/products">
                        <Button variant="ghost">Products</Button>
                    </Link>
                    <Link to="/cart">
                        <Button variant="ghost">Cart</Button>
                    </Link>
                    {state.user ? (
                        <Button variant="destructive" onClick={() => dispatch({ type: 'LOGOUT' })}>
                            Logout
                        </Button>
                    ) : (
                        <Link to="/login">
                            <Button>Login</Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}