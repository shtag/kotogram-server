import { compare, genSalt, hash } from "bcrypt";
import { users } from "../server.js";
import User from "../user.js";


const signup = async (req, res) => {
    if (!users.find(el => el.name === req.body.name)) {
        const user = new User(req.body.name, await hash(req.body.password, 10))
        users.push(user);
        const response = {
            name: req.body.name,
            password: req.body.password
        }
        res.status(200).json(response).send();
    } else {
        res.status(400).send('Login already taken');
    }
}
const login = async (req, res) => {
    const user = users.find(el => el.name === req.body.name)
    if (user) {
        const isSame = await compare(req.body.password, user.password);
        if (isSame) {
            const sessionId = await genSalt(10);
            user.sessions.push(sessionId);
            const body = {
                name: user.name,
                sessionId: sessionId,
                access: true
            };
            res.status(200).json(body).send();
        } else {
            res.status(400).send();
        }
    } else {
        res.status(404).send('User not found');
    }
}

const isSessionActive = async (req, res) => {
    const user = users.find(el => el.name === req.body.name)
    if (user) {
        if(user.sessions.includes(req.body.sessionId)) {
            const body = {
                sessionActive: true
            }
            res.status(200).json(body).send();
        } else {
            const body = {
                sessionActive: false
            }
            res.status(400).json(body).send();
        }
    } else {
        res.status(404).send('User not found');
    }
}
const logout = async (req, res) => {
    const user = users.find(el => el.name === req.body.name)
    if (user) {
        if(user.sessions.includes(req.body.sessionId)) {
            const id = user.sessions.indexOf(req.body.sessionId);
            user.sessions.splice(id, 1);
            res.status(200).send("logout");
        } else {
            res.status(400).json(body).send('Session is not active');
        }
    } else {
        res.status(404).send('User not found');
    }
}

export { signup, login, isSessionActive, logout };