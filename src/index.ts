import express from 'express';
import prisma from './prisma';


const app = express();
const port = 3000;

app.use(express.json());

// Route untuk menambahkan user baru
app.post('/users', async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: { username, password, roleId: 1}
    });
    res.json(newUser);
  } catch (error) {
    
    res.status(400).json({ error: error + 'Unable to create user' });
  }
});

// Route untuk mendapatkan semua user
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
