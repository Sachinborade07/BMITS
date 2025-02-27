import React, { createContext, useReducer, useContext } from 'react'

type CartItem = {
    id: number
    quantity: number
    product: Product
}

type CartState = {
    items: CartItem[]
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: number }
    | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }

const CartContext = createContext<{
    state: CartState
    dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(item => item.id === action.payload.id)
            if (existingItem) {
                return {
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                }
            }
            return { items: [...state.items, { id: action.payload.id, quantity: 1, product: action.payload }] }
        }
        case 'REMOVE_ITEM':
            return { items: state.items.filter(item => item.id !== action.payload) }
        case 'UPDATE_QUANTITY':
            return {
                items: state.items.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
                ),
            }
        default:
            return state
    }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] })
    return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within CartProvider')
    return context
}