import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Correction: manquait les parenthèses

    
    // Récupération du token CSRF
    const fetchCsrfToken = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/csrf-token', {
                credentials: 'include', 
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Accept':'application/json'}
            });
            
            if (response.ok) {
                const data = await response.json();
                setCsrfToken(data.csrf_token);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du token CSRF:', error);
        }
    };

useEffect(() => {
    fetchCsrfToken();
}, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    //'Content-Type': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json'
                },
                body: new URLSearchParams({
                    username: email,
                    password: password,
                    _csrf_token: csrfToken,
                })
            });

            const data = await response.json(); 

            console.log("data login", data);

            if (response.ok && data.success) {
                alert('Connexion réussie');
                navigate(data.data.url);
            } else {
                setError(data.message || 'Identifiants incorrects');
                alert('Échec de la connexion: ' + (data.message || 'Identifiants incorrects'));
            }
        } catch (err) {
            console.error('Erreur de connexion: '+err);
            setError('Erreur de connexion au serveur');
            alert('Erreur de connexion au serveur');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Connexion</h2>
            
            {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
            
            <div>
                <label>EMAIL</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    disabled={loading}
                />
            </div>

            <div>
                <label>MOT DE PASSE</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    disabled={loading}
                />
            </div>
            
            <button type="submit" disabled={loading}>
                {loading ? 'Connexion...' : 'Se connecter'}
            </button>
        </form>
    );
}

export default LoginForm;