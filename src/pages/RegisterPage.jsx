import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { REGISTER_MUTATION } from '../graphql/mutations';
import { useAuth } from '../context/AuthContext';
import '../index.css'

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const [registerUser, { loading, error }] = useMutation(REGISTER_MUTATION, {
        onCompleted: (data) => {
            console.log("Registracija sekminga:", data);
           
            if (data?.register?.token && data?.register?.user) {

                login(data.register.token, data.register.user);
                
                navigate('/');
            } else {
                
                console.error("Login response missing token or user data. Response:", data);
                
            }
        },
        onError: (error) => {
            
            console.error("Register mutation failed:", error.message);
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            alert("Prašome įvesti el. paštą ir slaptažodį.");
            return;
        }

        if (!name) {
            alert("Neįvestas vardas");
            return;
        }   else if (!surname) {
            alert("Neįvesta pavardė");
            return;
        }
        console.log(`Bandoma prisijungti: ${email}`);
        
        registerUser({ variables: { email, password, name, surname } });
    };

    return (
        <div className="grid justify-items-center">
            <h2 className="text-3xl text-center mt-12">Registracija</h2>
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
                <div className='mt-5'>
                    <label htmlFor="name"
                    className="block text-center text-xl">Vardas</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border border-black/[.30] rounded-md"
                    />
                </div>
                <div className='mt-5'>
                    <label htmlFor="surname"
                    className="block text-center text-xl">Pavardė</label>
                    <input
                        type="text"
                        id="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                        className="border border-black/[.30] rounded-md"
                    />
                </div>
               
                {error && <p style={{ color: 'red' }}>Klaida prisijungiant: {error.message}</p>}

                <button type="submit" disabled={loading}
                className="my-4 text-xl border border-black/[.10] drop-shadow rounded-md p-2
                bg-slate-200 hover:bg-bermuda/[.50] transition ease-in-out">
                    {loading ? 'Vykdoma...' : 'Registruotis'}
                </button>
            </form>
            <p>
                Jau turite paskyrą? <Link to="/login" className="underline hover:text-bermuda hover:drop-shadow">Prisijunkite</Link>
            </p>
        </div>
    );
}

export default RegisterPage;