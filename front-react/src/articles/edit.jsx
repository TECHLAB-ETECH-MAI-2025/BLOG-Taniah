import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ArticleEdit(){
    
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ title:'', content:''});

    useEffect(()=>{
    fetch(`http://localhost:8000/api/articles/${id}`)
      .then(response => response.json())
      .then(data => {
        setForm({title: data.title, content:data.content});
      });
    console.log(form);
    }, [id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]:value}));
    };

    const handleFormSubmit = (e) =>{
        e.preventDefault();
        fetch(`http://localhost:8000/api/articles/${id}`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/merge-patch+json'},
        body: JSON.stringify(form),
        })
        .then(()=> navigate('/articles'));
    };

    return(
        <div>
            <h2> Modifier l article {id}</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label >Contenu</label>
                    <input name="content" value={form.content} onChange={handleChange} />
                </div>
                <div>
                    <label >Titre</label>
                    <input name="title" value={form.title} onChange={handleChange} />
                </div>

                
                <button type="submit" > ENREGISTRER</button>
                <button type="button" onClick={()=> navigate('/articles')}>Annuler</button>
            </form>
        </div>
    );
};

export default ArticleEdit;