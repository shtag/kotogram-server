import { MongoClient } from 'mongodb';
const client = new MongoClient('mongodb+srv://vasyakanishchev:shtag1861@kotogram.zoyelpn.mongodb.net/?retryWrites=true&w=majority');

async function addNewUsers(user) {
    await client.connect();
    console.log('connected')
    const users = client.db().collection('users');
    await users.insertOne(user)
    maxId++;
}
async function getUsers() {
    await client.connect();
    console.log('connected')
    const users = client.db().collection('users');
    const usersLength = await users.countDocuments()
    console.log(usersLength)
    const coll = await client.db().listCollections()
    console.log(coll)
}
app.post('/usersasdasdasdasdasdasdas', async (req, res) => {
    const user = { 
        id: data.maxId, 
        login: req.body.login, 
        password: req.body.password 
    }
    data.maxId++;
    addNewUsers(user);
    res.status(200).json(users).send();
})