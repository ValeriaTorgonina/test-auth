const AUTH_STATE = {
    REGISTRATION: "registration",
    AUTHORISATION: "authorisation",
}

const ERRORS_TEXT = {
    EMPTY_INPUT: 'заполните поле логина и пароля',
    INVALID_LOGIN_OR_PASS: 'неверный логин или пароль',
    LOGIN_ALREADY_EXIST: 'такой пользователь уже существует',
}

export class AuthController {
    constructor(api, elem) {
        this.api = api;
        this.authState = AUTH_STATE.REGISTRATION;
        this.formElem = elem;
        this.formElem.addEventListener("submit", (e) => this.onSumbit(e));

        this.exitBtn = document.body.querySelector('#exit');
        this.exitBtn.addEventListener("click", () => this.exit());

        this.navElem = this.formElem.querySelector(".btn-group");
        this.navElem.addEventListener("click", (e) => this.toggleAuthState(e));

        this.errorElem = this.formElem.querySelector(".error");
    }

    exit() {
        localStorage.removeItem("user");
        document.dispatchEvent(new CustomEvent("onExit"));
    }

    showExitBtn() {
        this.exitBtn.style.display = 'block';
    }

    hideExitBtn() {
        this.exitBtn.style.display = 'none';
    }

    toggleAuthState(e) {
        const navBtn = e.target.closest("button");
        if (navBtn) {
            this.authState = navBtn.dataset.authState;
            this.changeActiveNavBtn();
            this.changeSubmitBtnText();
        }
    }

    changeActiveNavBtn() {
        this.navElem.querySelector(".btn.active").classList.remove("active");
        this.navElem.querySelector(`#${this.authState}`).classList.add("active");
    }

    changeSubmitBtnText() {
        const submitBtn = this.formElem.querySelector(".btn-submit");
        if (this.authState === AUTH_STATE.AUTHORISATION) {
            submitBtn.textContent = "войти";
        } else {
            submitBtn.textContent = "зарегистрироваться";
        }
    }

    registerUser(login, password) {
        this.api.registerUser(login, password)
        .then((user) => {
            localStorage.setItem("user", JSON.stringify(user));
            document.dispatchEvent(new CustomEvent("onLogin"));
            this.hideError();
        })        
        .catch(error => this.showError(ERRORS_TEXT.LOGIN_ALREADY_EXIST));
    }

    loginUser(login, password) {
        this.api.loginUser(login, password)
        .then((user) => {
            localStorage.setItem("user", JSON.stringify(user));
            document.dispatchEvent(new CustomEvent("onLogin"));
            this.hideError();
        })
        .catch(error => this.showError(ERRORS_TEXT.INVALID_LOGIN_OR_PASS));
    }

    onSumbit(e) {
        e.preventDefault();
        const { login, password } = this.getValues();
        if (login !== "" && password !== "") {
            this.hideError();

            if (this.authState === AUTH_STATE.AUTHORISATION) {
                this.loginUser(login, password);
            } else {
                this.registerUser(login, password);
            }
        } else {
            showError(ERRORS_TEXT.EMPTY_INPUT);
        }
    }

    showError(errorText) {
        this.errorElem.style.display = "block";
        this.errorElem.textContent = errorText;
    }

    hideError() {
        this.errorElem.style.display = "none";
    }

    getValues() {
        const login = this.formElem.querySelector("#login").value;
        const password = this.formElem.querySelector("#password").value;
        return {
            login,
            password,
        };
    }
}
