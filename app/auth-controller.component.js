export class AuthController {
    constructor(api, elem) {
        this.api = api;
        this.state = 'authorisation';
        this.formElem = elem;
        this.formElem.addEventListener('submit', (e) => this.onSumbit(e));
    }

    registerUser(login, password) {
        this.api.registerUser(login, password)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
        })
    }

    loginUser(login, password) {
        this.api.loginUser(login, password)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
        })
    }

    onSumbit(e) {
        e.preventDefault();
        const {login, password} = this.getValues();
        if(this.state === 'authorisation') {
            this.loginUser(login, password);
        }else {
            this.registerUser(login, password);
        }
    }

    getValues() {
        const login = this.formElem.querySelector('#login').value;
        const password = this.formElem.querySelector('#password').value;
        return {
            login,
            password
        }
    }
}