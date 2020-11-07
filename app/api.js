export class Api {
    getUsers() {
        return fetch('/users').then(response => response.json())
    }

    registerUser(login, password) {
        return this.#getUser('/users', login, password);
    }

    loginUser(login, password) {
        return this.#getUser('/auth/login', login, password);
    }

    #getUser(url, login, password) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login,
                password
            })
        }).then(response => response.json())
    }
}