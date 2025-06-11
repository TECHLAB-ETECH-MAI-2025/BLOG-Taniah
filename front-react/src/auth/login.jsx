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

    const styles = {
        body :{
            margin:'0px',
            padding:'0px',
            background: '#f0f4f8',
            height: '100vh',
        },
        logincontainer: {
            width: '400px',
            margin: '60px auto',
            background: '#ffffff',
            borderRadius: '10px',
            padding: '40px',
            boxShadow: '0 0 15px rgba(0,0,0,0.1)',
        },
        btnprimary: {
            background: '#4682b4',
            borderColor: '#4682b4',
            color: 'white'
        }
    }
    return (
        <div style={styles.body}>
        <form onSubmit={handleLogin} style={styles.logincontainer}>
            <h2 className="text-center mb-4 text-primary">Connexion</h2>
            
            {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
            
            <div className="mb-3">
                <label>EMAIL</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    disabled={loading} className='form-control'
                />
            </div>

            <div className="mb-3">
                <label>MOT DE PASSE</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    disabled={loading} className='form-control'
                />
            </div>
            
            <button type="submit" disabled={loading} className='btn w-100' style={styles.btnprimary}>
                {loading ? 'Connexion...' : 'Se connecter'}
            </button>
        </form>
        </div>
    );
}

export default LoginForm;