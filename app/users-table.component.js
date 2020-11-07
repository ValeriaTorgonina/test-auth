export class UsersTable {
    constructor(table) {
        this._table = table;
    }

    drawUsers(users) {
        const usersRows = users.map(({id, login, role}, i) => {
            return `
                <tr>
                    <th scope="row">${i+1}</th>
                    <td>${login}</td>
                    <td>${id}</td>
                    <td>${role}</td>
                </tr>
            `;
        }).join();
        this._table.querySelector('tbody').innerHTML = usersRows;
    }
}