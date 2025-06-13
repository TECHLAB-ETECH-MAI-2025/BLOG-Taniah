import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

const SignForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();


  const onSubmit = (data) => {
     // Transforme le champ 'roles' en tableau
     const payload = {
      ...data,
      roles: [data.roles], 
    };
  
    console.log("Payload envoyé :", payload);
    fetch('http://localhost:8000/api/users',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then((response) => {
      if (!response.ok) throw new Error("Erreur serveur");
      return response.json();
    })
    .then((result) => {
      console.log('Réponse du serveur :', result);
      
      // ROLES 
      const userRoles = result.roles || [];
      
      if (userRoles.includes('ROLE_ADMIN'))
      {
        navigate('/articles/show');
        console.log('ADMINNNNNNNNN');
        
      } 
      else if (userRoles.includes('ROLE_USER')){
        navigate('/articles');
        console.log('USERRRR');
      }

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
    // btnprimary:hover :{
    //     background-color: #3b6d99;
    //     border-color: #3b6d99;
    // }
  }

  return (
  <div style={styles.body}>
    <form onSubmit={handleSubmit(onSubmit)} style={styles.logincontainer}>
      <h2>Formulaire d'inscription</h2>

      <div>
        <label>Pseudo :</label>
        <input {...register('pseudo', { required: 'Pseudo requis' })} />
          {errors.pseudo && <span style={{ color: 'red' }}>{errors.nom.message}</span>}
      </div>

      <div>
        <label>Email :</label>
        <input
          type="email"
          {...register('email', {
            required: 'Email requis',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Email invalide'
            }
          })}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
      </div>

      <div>
        <label>Mot de passe :</label>
        <input
          type="password"
          {...register('plainPassword', {
            required: 'Mot de passe requis',
            minLength: {
              value: 6,
              message: '6 caractères minimum'
            }
          })}
        />
        {errors.plainpassword && <span style={{ color: 'red' }}>{errors.plainpassword.message}</span>}
      </div>

      <div className="mb-3">
        <select
          id="roles"
          {...register('roles', { required: 'Le rôle est requis' })}
          className="form-select"
        >
          <option value="">-- Choisir un rôle --</option>
          <option value="ROLE_USER">Utilisateur</option>
          <option value="ROLE_ADMIN">Administrateur</option>
        </select>
          {errors.roles && (
            <div style={{ color: 'red' }}>{errors.roles.message}</div>
          )}
      </div>

      <button type="submit" style={styles.btnprimary}>
        S'inscrire
      </button>
    </form>
    </div>
  );
};

export default SignForm ;
