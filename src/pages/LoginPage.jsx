import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { LOGIN_MUTATION } from '../graphql/mutations'; // Importuojame mutaciją
import { useAuth } from '../context/AuthContext';     // Importuojame AuthContext hook'ą
import '../index.css'

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Gauname login funkciją iš konteksto

    // Naudojame useMutation hook'ą
    const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION, {
        onCompleted: (data) => {
            console.log("Login successful:", data);
            // Tikriname, ar gavome reikiamus duomenis iš backend
            if (data?.login?.token && data?.login?.user) {
                // Kvieskime login funkciją iš AuthContext, perduodami token'ą ir user duomenis
                login(data.login.token, data.login.user);
                // Nukreipiame į pagrindinį puslapį (arba dashboard) PO login funkcijos iškvietimo
                navigate('/'); // Arba navigate('/dashboard');
            } else {
                // Jei backend'as negrąžino to, ko tikėjomės
                console.error("Login response missing token or user data. Response:", data);
                // TODO: Nustatyti vartotojui matomą klaidos pranešimą
            }
        },
        onError: (error) => {
            // GraphQL klaidos (pvz., AuthenticationError iš backend)
            console.error("Login mutation failed:", error.message);
            // TODO: Nustatyti vartotojui matomą klaidos pranešimą pagal error.message
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            alert("Prašome įvesti el. paštą ir slaptažodį.");
            return;
        }
        console.log(`Attempting login for: ${email}`);
        // Kvieskime mutaciją su įvestais duomenimis kaip kintamaisiais (variables)
        loginUser({ variables: { email, password } });
    };

    return (
        <div>
            <h2>Prisijungimas</h2>
            <form onSubmit={handleSubmit}>
                {/* Email ir Password input laukeliai (kaip anksčiau) */}
                 <div>
                    <label htmlFor="email">El. paštas:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Slaptažodis:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>

                {/* Rodyti klaidos pranešimą, jei yra */}
                {error && <p style={{ color: 'red' }}>Klaida prisijungiant: {error.message}</p>}

                {/* Blokuoti mygtuką, kol vyksta užklausa */}
                <button type="submit" disabled={loading}>
                    {loading ? 'Jungiamasi...' : 'Prisijungti'}
                </button>
            </form>
            <p>
                Neturite paskyros? <Link to="/register">Registruokitės</Link>
            </p>
        </div>
    );
}

export default LoginPage;