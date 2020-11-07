import { AuthController } from './auth-controller.component.js';
import { UsersTable } from './users-table.component.js';
import { Api } from './api.js';

class App {
    constructor() {
        this.api = new Api();
        this.form = document.querySelector('form');
        this.table = document.body.querySelector('table');
        this.authController = new AuthController(this.api, this.form);
        this.usersTable = new UsersTable(this.table);
        this.showForm();
    }

    showTable() {
        this.form.style.display = 'none';
        this.table.style.display = 'block';
    }

    showForm() {
        this.form.style.display = 'block';
        this.table.style.display = 'none';
    }

    getUsers() {
        this.api.getUsers()
        .then(users => {
            this.usersTable.drawUsers(users);
            this.showTable();
        })
    }
}


new App();