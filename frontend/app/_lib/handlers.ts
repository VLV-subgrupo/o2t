import { FormEvent } from "react";
import Cookies from "js-cookie";

export const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    // Example API request using fetch
    try {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const response = await fetch('http://localhost:8080/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.get("email"),
                password: formData.get("password"),
            })
        });

        if (!response.ok) {
            throw new Error('Login failed')
        }

        const data = await response.json()
        Cookies.set('token', data.token, { expires: 7, secure: true });
    } catch (error) {
        console.error('Error during login:', error);
    }
};