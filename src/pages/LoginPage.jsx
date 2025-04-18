import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { LOGIN_MUTATION } from '../graphql/mutations';
import { useAuth } from '../context/AuthContext';
import '../index.css'

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION, {
        onCompleted: (data) => {
            console.log("Login successful:", data);
           
            if (data?.login?.token && data?.login?.user) {

                login(data.login.token, data.login.user);
                
                navigate('/');
            } else {
                
                console.error("Login response missing token or user data. Response:", data);
                
            }
        },
        onError: (error) => {
            
            console.error("Login mutation failed:", error.message);
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            alert("Prašome įvesti el. paštą ir slaptažodį.");
            return;
        }
        console.log(`Bandoma prisijungti: ${email}`);
        
        loginUser({ variables: { email, password } });
    };

    return (
        <div className="grid justify-items-center">
            <h2 className="text-3xl text-center mt-12">Prisijungimas</h2>
            <form onSubmit={handleSubmit}
            className="mt-12 flex flex-col items-center">
                
                 <div>
                    <label htmlFor="email"
                    className="block text-center text-xl">El. paštas</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className="border border-black/[.30] rounded-md"
                    />
                </div>
                <div className='mt-5'>
                    <label htmlFor="password"
                    className="block text-center text-xl">Slaptažodis</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        className="border border-black/[.30] rounded-md"
                    />
                </div>
               
                {error && <p style={{ color: 'red' }}>Klaida prisijungiant: {error.message}</p>}

                <button type="submit" disabled={loading}
                className="my-4 text-xl border border-black/[.10] drop-shadow rounded-md p-2
                bg-slate-200 hover:bg-bermuda/[.50] transition ease-in-out">
                    {loading ? 'Jungiamasi...' : 'Prisijungti'}
                </button>
            </form>
            <p>
                Neturite paskyros? <Link to="/register" className="underline hover:text-bermuda hover:drop-shadow">Registruokitės</Link>
            </p>
        </div>
    );
}

export default LoginPage;