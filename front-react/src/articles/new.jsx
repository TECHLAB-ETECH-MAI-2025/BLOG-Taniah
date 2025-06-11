import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
const ArticleNew= ()=>{
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        console.log("Payload envoyé :", data);
        fetch('http://localhost:8000/api/articles',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => {
            if (!response.ok) throw new Error("Erreur serveur");
            return response.json();
        })
        .then((result) => {
             console.log('Réponse du serveur :', result);
        })
        .catch((error) => {
        console.error('Erreur :', error);
        alert("Une erreur est survenue.");
        });

        reset(); 
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
        }
    }
    return(
        <div style={styles.body}>
            <form onSubmit={handleSubmit(onSubmit)} style={styles.logincontainer}>
            <h2>Création nouveau article</h2>

            <div>
                <label>Nom de l article :</label>
                <input {...register('title', { required: 'Titre requis' })} />
                {errors.title && <span style={{ color: 'red' }}>{errors.nom.message}</span>}
            </div>

            <div>
                <label>Contenu :</label>
                <input {...register('content', { required: 'Contenu requis' })} />
                {errors.content && <span style={{ color: 'red' }}>{errors.nom.message}</span>}
            </div>

            
            <button type="submit" style={styles.btnprimary}>
                Créer
            </button>

            </form>
        </div>
    );
}

export default ArticleNew;