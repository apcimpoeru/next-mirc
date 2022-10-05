import clientPromise from '../../../lib/mongodb-api';
import { hashPassword } from '../../../lib/authorization';

async function handler(req, res) {

    console.log(req.body);

    const data = req.body;

    const { username, password } = data;

    await clientPromise;
    const client = await clientPromise;
    await client.connect();    
    const db = client.db();

    console.log(db);

    const existingUser = await db.collection('users').findOne({ username: username });

    console.log(existingUser);

    let message = '';

    if (existingUser){
        res.status(201).json({ message: 'Account with that username already exists.' });
        client.close();
        return;
    }

    const hashPwd = await hashPassword(password);

    const result = await db.collection('users').insertOne({
        username: username,
        password: hashPwd,
    });

    res.status(201).json({ message:'Account created, you can log in.' });
    client.close();

}
export default handler;