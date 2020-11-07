const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
cookieParser = require('cookie-parser');
const { Error404, ForbiddenError } = require('./errors');
const createId = require('./create-id');

const app = express();
app.use(cors({
    origin: '*',
    allowedHeaders: '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static('public'))

let users = [{
    id: 1,
    name: 'Initial Admin',
    login: 'initial_admin',
    password: 'admin',
    role: 'admin'
}, {
    id: 2,
    name: 'Test User',
    login: 'test_user',
    password: 'privet',
    role: 'user'
}];

app.post('/auth/login', (req, res) => {
    try {
        const { login, password } = req.body;
        const user = users.find(u => u.login === login);

        if (!user) {
            throw new Error404(`user with login "${login}" is not exist`);
        }

        if (user.password !== password) {
            throw new ForbiddenError('password is not correct');
        }

        res.cookie('userId', user.id, { domain: '.afl.com', maxAge: 864000, path: '/' })

        res.send(user);
    } catch (err) {
        res.status(err.status || 500).send(err);
    }

});


app.post('/users', (req, res) => {
    try {
        const { login, role = 'user' } = req.body;
        const isLoginExist = users.some(u => u.login === login);
        const creater = users.find(u => u.id === parseInt(req.cookies.userId));
        const isCreaterAdmin = creater ? creater.role === 'admin' : false;

        if (isLoginExist) {
            throw new ForbiddenError(`login "${login}" is already exist`);
        }

        if (role !== 'user' && !isCreaterAdmin) {
            throw new ForbiddenError(`only admins can create users with role diffrent from "user"`);
        }

        const newUser = {
            ...req.body,
            role,
            id: createId()
        };

        users.push(newUser)
        if (isCreaterAdmin) {
            res.send(newUser);
        } else {
            res.redirect(307, '/auth/login')
        }

    } catch (err) {
        res.status(err.status || 500).send(err);
    }
});

app.get('/users', (req, res) => {
    try {
        const userExist = users.some(u => u.id === parseInt(req.cookies.userId));
        if (!userExist) {
            throw new ForbiddenError('should login before getting any data');
        }

        res.send(users);
    } catch (err) {
        res.status(err.status || 500).send(err);
    }
});

app.get('/users/:id', (req, res) => {
    try {
        const userExist = users.some(u => u.id === parseInt(req.cookies.userId));
        if (!userExist) {
            throw new ForbiddenError('should login before getting any data');
        }

        const user = users.find(u => u.id === parseInt(req.params.id));
        if (!user) {
            throw new Error404(`user with id "${req.params.id}" is not exists`);
        }

        res.send(user);
    } catch (err) {
        res.status(err.status || 500).send(err);
    }
});

app.patch('/users/:id', (req, res) => {
    try {
        const userExist = users.some(u => u.id === parseInt(req.cookies.userId));
        if (!userExist) {
            throw new ForbiddenError('should login before getting any data');
        }

        const user = users.find(u => u.id === parseInt(req.params.id));
        if (!user) {
            throw new Error404(`user with id "${req.params.id}" is not exists`);
        }

        Object.assign(user, {
            name: req.body.name
        });

        res.send({ success: true });
    } catch (err) {
        res.status(err.status || 500).send(err);
    }
});

app.delete('/users/:id', (req, res) => {
    try {
        const userExist = users.some(u => u.id === parseInt(req.cookies.userId));
        if (!userExist) {
            throw new ForbiddenError('should login before getting any data');
        }

        const user = users.find(u => u.id === parseInt(req.params.id));
        if (!user) {
            throw new Error404(`user with id "${req.params.id}" is not exists`);
        }

        users = users.filter(u => u === user);
        res.send({ success: true });
    } catch (err) {
        res.status(err.status || 500).send(err);
    }
});

app.listen(80, () => {
    console.log(`Example app listening at http://localhost:${80}`)
})
