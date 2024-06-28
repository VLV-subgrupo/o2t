import { error } from "console";
import Cookies from "js-cookie";
import { SetStateAction } from "react";

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

export const handleGetMetrics = async (fromDate: Date, toDate: Date, type = -1) => {
    const userCookies = Cookies.get('user')
    const token = Cookies.get('token')
    if (userCookies){
        try {
            const user = JSON.parse(userCookies)
            const response = await fetch(`http://localhost:8080/v1/metric/user/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })

            let metrics: string[][] = []
            const data: Array<any> = await response.json()
            const types = ['WEIGHT', 'HYDRATION', 'SLEEP', 'CALORIES']
            data.forEach((element) => {
                const elementDate = new Date(element.registrationDate)
                if(elementDate >= fromDate && elementDate <= toDate && (type == -1 || types[type] == element.metricType)){
                    let id: string = element.id
                    let date: string = element.registrationDate
                    let type: string = element.metricType
                    let value: string = element.value
                    metrics.push([date, type, value, id])
                }
            })
            return metrics
        } catch (error) {
            console.log(error)
        }
    }
}

export const handleCreateMetric = async (t: number, value: string) => {
    const userCookies = Cookies.get('user')
    const token = Cookies.get('token')
    if (userCookies){
        const today = new Date()
        const types = ['WEIGHT', 'HYDRATION', 'SLEEP', 'CALORIES']
        const user = JSON.parse(userCookies)
        const response = await fetch('http://localhost:8080/v1/metric', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                "createdBy": user.id,
                "registrationDate": today,
                "metricType": types[t],
                "value": value
            })
        })
        if (!response.ok) {
            throw Error("Couldn't create workout")
        }
    }
}

export const handleUpdateMetric = async (t: string, value: string, id: string) => {
    const userCookies = Cookies.get('user')
    const token = Cookies.get('token')
    if (userCookies){
        const today = new Date()
        const user = JSON.parse(userCookies)
            try {
                const response = await fetch(`http://localhost:8080/v1/metric/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    body: JSON.stringify({
                        "createdBy": user.id,
                        "registrationDate": today,
                        "metricType": t,
                        "value": value
                    })
                })
            }catch (error) {
                console.log(error)
            }
    }
}