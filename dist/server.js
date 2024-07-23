"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const json_1 = require("hono/json");
const cors_1 = require("@hono/cors");
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_controller_1 = require("./users/users.controller");
// Initialize the Hono app
const app = new hono_1.Hono();
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable for secret
// Middleware
app.use('*', (0, json_1.json)()); // JSON middleware for parsing request bodies
app.use('*', (0, cors_1.corsMiddleware)()); // CORS middleware to allow cross-origin requests
// Mock database (replace with actual database integration)
const users = [];
// Middleware for authentication
const authenticate = async (c, next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
        return c.json({ error: 'Authorization header missing' }, 401);
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        c.req.user = decoded;
        await next();
    }
    catch (error) {
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
    }
    catch (error) {
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
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
        return c.json({ token });
    }
    catch (error) {
        console.error('Error logging in:', error);
        return c.json({ error: 'Failed to login' }, 500);
    }
});
// Protected routes
app.use('/api/*', authenticate);
// User Routes
app.get('/api/users', users_controller_1.listUsers);
app.get('/api/users/:id', users_controller_1.getUser);
app.post('/api/users', users_controller_1.createUser);
app.put('/api/users/:id', users_controller_1.updateUser);
app.delete('/api/users/:id', users_controller_1.deleteUser);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
