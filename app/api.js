export class Api {
    getUsers() {
        return fetch('/users').then(response => response.json())
    }

    registerUser(login, password) {
        return this._getUser('/users', login, password);
    }

    loginUser(login, password) {
        return this._getUser('/auth/login', login, password);
    }

    _getUser(url, login, password) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login,
                password
            })
        })
        .then(response => {
            if(response.status.toString().includes('40')) {
                throw new Error(response.status);
            }
            return response.json();
        })
    }
}