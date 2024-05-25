import React, { useState } from 'react';
import { registerUser } from '../services/api';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await registerUser({ username, password });
            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterPage;
