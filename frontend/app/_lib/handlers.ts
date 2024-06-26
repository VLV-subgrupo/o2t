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
            labels.push([labelName, labelColor])
        })
        
        return labels
    }
}

export const handleDeleteLabel = async (name: string) => {
    const userCookies = Cookies.get('user')
    const token = Cookies.get('token')
    if (userCookies) {
        const user = JSON.parse(userCookies)
        let response = await fetch('http://localhost:8080/v1/labels/user/' + user.id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })

        const data: Array<any> = await response.json()
        let labels: string[][] = []
        data.forEach(async (element: any) => {
            if (element.name === name) {
                await fetch('http://localhost:8080/v1/labels/' + element.id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                })
            } else {
                labels.push([element.name, element.color])
            }
        })

        return labels
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
    }
}

export const handleGetIndexesOfLabels = async (labels: string[][]) => {
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
        const data: Array<any> = await response.json()
        let ids: number[] = []
        for (let i = 0; i < labels.length; i++) {
            data.forEach(element => {
                if (labels[i][0].localeCompare(element.name)) {
                    ids.push(element.id)
                }
            })
        }
        
        return ids
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