import React, { createContext, useReducer, useContext } from 'react'

type User = {
    id: number
    email: string
    username: string
    token?: string
}

type UserState = {
    user: User | null
}

type UserAction =
    | { type: 'LOGIN'; payload: User }
    | { type: 'LOGOUT' }

const UserContext = createContext<{
    state: UserState
    dispatch: React.Dispatch<UserAction>
} | null>(null)

function userReducer(state: UserState, action: UserAction): UserState {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('user', JSON.stringify(action.payload))
            return { user: action.payload }
        case 'LOGOUT':
            localStorage.removeItem('user')
            return { user: null }
        default:
            return state
    }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(userReducer, { user: JSON.parse(localStorage.getItem('user') || 'null') })
    return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) throw new Error('useUser must be used within UserProvider')
    return context
}