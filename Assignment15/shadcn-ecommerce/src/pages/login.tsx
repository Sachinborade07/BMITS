// pages/login.tsx
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/user'
import { Label } from '@/components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from '@/components/ui/button'
import { login } from '../api/auth'

export default function Login() {
    const { dispatch } = useUser()
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            dispatch({ type: 'LOGIN', payload: { ...data.user, token: data.token } })
            navigate('/')
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        mutation.mutate({
            username: formData.get('username') as string,
            password: formData.get('password') as string,
        })
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label>Username</Label>
                    <Input name="username" required />
                </div>
                <div>
                    <Label>Password</Label>
                    <Input name="password" type="password" required />
                </div>
                <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? 'Logging in...' : 'Login'}
                </Button>
            </form>
        </div>
    )
}