import Cookies from "js-cookie";

export const handleLogin = async (formData: FormData) => {
    const response = await fetch('http://localhost:8080/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password"),
        })
    })

    if (!response.ok) {
        throw new Error('Login failed')
    }
    const data = await response.json()
    Cookies.set('token', data.token, { expires: 7, secure: true })
    await handleGetUser(formData.get("email") + '')
}

export const handleRegister = async (formData: FormData) => {
    const response = await fetch('http://localhost:8080/v1/auth/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
            sport: formData.get("sport")
        })
    })

    if (!response.ok) {
        throw new Error('Register failed')
    }
    await handleLogin(formData)
}

export const handleGetUser = async (email: string) => {
    const token = Cookies.get('token')
    if (token === undefined) {
        throw new Error('Not Logged In')
    }
    const response = await fetch('http://localhost:8080/v1/users/email/' + email, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    if (!response.ok) {
        throw new Error('Find User by Email failed')
    }

    const data = await response.json()
    Cookies.set('user', JSON.stringify(data), { expires: 7, secure: true })
}