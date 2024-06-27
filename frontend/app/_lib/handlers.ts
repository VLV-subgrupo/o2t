import Cookies from "js-cookie";

export const handleLogin = async (email: string, password: string) => {
    const response = await fetch('http://localhost:8080/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })

    if (!response.ok) {
        throw new Error('Login failed')
    }
    const data = await response.json()
    Cookies.set('token', data.token, { expires: 7, secure: true })
    await handleGetUser(email + '')
}

export const handleRegister = async (username: string, email: string, password: string, sport: string) => {
    const response = await fetch('http://localhost:8080/v1/auth/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: username,
            email: email,
            password: password,
            sport: sport,
        })
    })

    if (!response.ok) {
        throw new Error('Register failed')
    }
    await handleLogin(email, password)
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

export const handleUpdatePassword = async (oldPassword: string, newPassword: string) => {
    const token = Cookies.get('token')
    const userCookies = Cookies.get('user')
    if (userCookies && token) {
        const user = JSON.parse(userCookies)
        const response  = await fetch('http://localhost:8080/v1/users/' + user.id + '/password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                'previousPassword': oldPassword,
                'newPassword': newPassword,
            })
        })
        if (!response.ok) {
            throw Error("Couldn't change password")
        }
    }
}

export const handleGetAllUserLabels = async () => {
    const userCookies = Cookies.get('user')
    const token = Cookies.get('token')
    if (userCookies) {
        const user = JSON.parse(userCookies)
        const response = await fetch('http://localhost:8080/v1/labels/user/' + user.id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
        if (!response.ok) {
            throw new Error("Couldn't find labels")
        }

        let labels: string[][] = []
        const data: Array<any> = await response.json()
        data.forEach((element: any) => {
            let labelName: string = element.name
            let labelColor: string = element.color
            let labelId: string = element.id
            labels.push([labelName, labelColor, labelId])
        })
        
        return labels
    }
}

export const handleDeleteLabel = async (id: string) => {
    const userCookies = Cookies.get('user')
    const token = Cookies.get('token')
    if (userCookies) {
        const user = JSON.parse(userCookies)
        const response = await fetch('http://localhost:8080/v1/labels/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
        if (!response.ok) {
            throw new Error("Couldn't delete label")
        }
    }
}

export const handleAddLabel = async (name: string, color: string) => {
    const userCookies = Cookies.get('user')
    const token = Cookies.get('token')
    if (userCookies) {
        const user = JSON.parse(userCookies)
        const response = await fetch('http://localhost:8080/v1/labels', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                'name': name,
                'color': color,
                'createdById': user.id
            })
        })
        if (!response.ok) {
            throw new Error("Couldn't add label")
        }

        const data = await response.json()

        return data.id
    }
}

export const handleCreateWorkout = async (date: Date, title: string, description: string, createdBy: number, labels: number[]) => {
    const token = Cookies.get('token')
    if (token) {
        const response = await fetch('http://localhost:8080/v1/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                "registrationDate": date,
                "title": title,
                "description": description,
                "createdById": createdBy,
                "labelsIds": labels,
            })
        })
        if (!response.ok) {
            throw Error("Couldn't create workout")
        }
    }
}

export const handleGetAllUserWorkouts = async () => {
    const token = Cookies.get('token')
    const userCookies = Cookies.get('user')
    if (userCookies) {
        const user = JSON.parse(userCookies)
        const response = await fetch('http://localhost:8080/v1/workouts/user/' + user.id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
        if (!response.ok) {
            throw Error("Couldn't get workouts")
        }
        const data = await response.json()

        return data
    }
}

export const handleUpdateWorkout = async (id: number, date: Date, title: string, description: string, createdBy: number, labels: number[]) => {
    const token = Cookies.get('token')
    if (token) {
        const response = await fetch('http://localhost:8080/v1/workouts/' + id + '/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                "registrationDate": date,
                "title": title,
                "description": description,
                "createdById": createdBy,
                "labelsIds": labels,
            })
        })
        if (!response.ok) {
            throw Error("Couldn't update workout")
        }
    }
}

export const handleDeleteWorkout = async (id: number) => {
    const token = Cookies.get('token')
    if (token) {
        const response = await fetch('http://localhost:8080/v1/workouts/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
        if (!response.ok) {
            throw Error("Couldn't delete workout")
        }
    }
}