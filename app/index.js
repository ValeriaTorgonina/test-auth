import { AuthController } from './auth-controller.component.js';
import { UsersTable } from './users-table.component.js';
import { Api } from './api.js';

class App {
    constructor() {
        this.api = new Api();
        this.form = document.body.querySelector('form');
        this.table = document.body.querySelector('table');
        this.authController = new AuthController(this.api, this.form);
        this.usersTable = new UsersTable(this.table);
        this.checkIfUserExist();
        document.addEventListener('onLogin', () => this.getUsers());
        document.addEventListener('onExit', () => this.showForm());
    }

    checkIfUserExist() {
        if (JSON.parse(localStorage.getItem("user"))) {
            this.getUsers();
        } else {
            this.showForm();
        }
    }

    showTable() {
        this.form.style.display = 'none';
        this.table.style.display = 'block';
        this.authController.showExitBtn();
    }

    showForm() {
        this.form.style.display = 'block';
        this.table.style.display = 'none';
        this.authController.hideExitBtn();
    }

    getUsers() {
        this.api.getUsers()
        .then(users => {
            this.usersTable.drawUsers(users);
            this.showTable();
        })
        .catch(error => console.error(error));
    }
}


new App();