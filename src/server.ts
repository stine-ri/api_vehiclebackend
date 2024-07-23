import { Hono } from 'hono';
import { json } from 'hono/json';
import { corsMiddleware } from '@hono/cors';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Context } from 'hono';
import { listUsers, getUser, createUser, updateUser, deleteUser } from './users/users.controller';

// Initialize the Hono app
const app = new Hono();
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable for secret

// Middleware
app.use('*', json()); // JSON middleware for parsing request bodies
app.use('*', corsMiddleware()); // CORS middleware to allow cross-origin requests

// Mock database (replace with actual database integration)
const users: any[] = [];

// Middleware for authentication
const authenticate = async (c: Context, next: () => Promise<void>) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
        return c.json({ error: 'Authorization header missing' }, 401);
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
        c.req.user = decoded;
        await next();
    } catch (error) {
        return c.json({ error: 'Invalid or expired token' }, 401);
    }
};

// Route for user registration
app.post('/api/register', async (c) => {
    try {
        const { username, password } = await c.req.json();
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = { id: String(users.length + 1), username, password: hashedPassword };
        users.push(newUser);
        return c.json({ id: newUser.id, username: newUser.username }, 201);
    } catch (error) {
        console.error('Error registering user:', error);
        return c.json({ error: 'Failed to register user' }, 500);
    }
});

// Route for user login
app.post('/api/login', async (c) => {
    try {
        const { username, password } = await c.req.json();
        const user = users.find(u => u.username === username);
        if (!user) {
            return c.json({ error: 'Invalid username or password' }, 401);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return c.json({ error: 'Invalid username or password' }, 401);
        }
        const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
        return c.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        return c.json({ error: 'Failed to login' }, 500);
    }
});

// Protected routes
app.use('/api/*', authenticate);

// User Routes
app.get('/api/users', listUsers);
app.get('/api/users/:id', getUser);
app.post('/api/users', createUser);
app.put('/api/users/:id', updateUser);
app.delete('/api/users/:id', deleteUser);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
