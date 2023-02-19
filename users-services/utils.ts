import { User } from './user.model';

const users: User[] = [];

export function checkIfUserExists(username: string, email: string): boolean {
    return users.some(user => user.username === username || user.email === email);
}

// Get a user's data by their username
export function getUserData(username: string): User | undefined {
    return users.find(user => user.username === username);
}

// Create an authentication token for the given user ID
export function createAuthToken(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}