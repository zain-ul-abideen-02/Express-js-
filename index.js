import express from 'express';

const app = express();
app.use(express.json());

let users = [];

app.get('/', (req, res) => {
    res.send(users);
});


app.post('/', (req, res) => {
    const body = req.body;

    if (Array.isArray(body)) {
        const usersWithId = body.map(user => ({
            id: Math.floor(Math.random() * 1000000).toString(),
            ...user
        }));
        users.push(...usersWithId);
        console.log("Received Array of Users:", usersWithId);
    } else {
        const newUser = {
            id: Math.floor(Math.random() * 1000000).toString(),
            ...body
        };
        users.push(newUser);
        console.log("Received Single User:", newUser);
    }

    console.log("All users now:", users);
    res.send("User(s) successfully received");
});


app.delete('/:id', (req, res) => {
    const userId = req.params.id;
    console.log('Delete request for ID:', userId);
    console.log('Users before deletion:', users);

    const initialLength = users.length;

    users = users.filter(user => user.id !== userId);

    console.log('Users  deleting:', users);

    if (users.length === initialLength) {
        return res.send(`User with id ${userId} not found`);
    }

    res.send(`User with id ${userId} deleted`);
});


app.put('/user/:id', (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    console.log('Update request for ID:', userId, 'with data:', updatedData);
    console.log('Users update:', users);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.send(`User with id ${userId} not found`);
    }
    users[userIndex] = { ...users[userIndex], ...updatedData };
    console.log('Users updated:', users);
    res.send(`User with id ${userId} updated`);
});



app.listen(3000, () => {
    console.log('Server is running... ');
});




