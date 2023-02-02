import { compare, genSalt, hash } from "bcrypt";
import { users } from "../server.js";
import User from "../user.js";


const signup = async (req, res) => {
    if (!users.find(el => el.name === req.body.name)) {
        const user = new User(req.body.name, await hash(req.body.password, 10))
        users.push(user);
        res.status(200).json(user).send();
    } else {
        res.status(400).send('Login already taken');
    }
}

const login = async (req, res) => {
    const user = users.find(el => el.name === req.body.name)
    if (user) {
        const isSame = await compare(req.body.password, user.password);
        if (isSame) {
            const body = {
                hashKey: await hash(user.password, 10),
                access: true
                };
            res.status(200).send('Access is allowed');
        } else {
            console.log(isSame)
            res.status(400).send('Access is denied');
        }
    } else {
        res.status(404).send('User not found');
    }
}

export { signup, login };