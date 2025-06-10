import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ArticleShow() {
  const { id } = useParams();
  const [articles, setArticles] = useState({ title:'', content:''});
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/articles/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Données reçues :', data);
        setArticles(data);
      });
  }, [id]);

  const loadComments = () => {
    fetch(`http://localhost:8000/api/comments?article.id=${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Données reçues :', data);
        setComments(data.member);
      })
  };

    useEffect(() => {
      loadComments()
    }, [id])

  const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                  content:comment,
                  author: "react",
                  article: `/api/articles/${id}`
                }),
            });

            const data = await response.json(); 

            console.log("post comment", data);

            loadComments()
        } catch (err) {
            console.error('Erreur de connexion: '+err);
            alert('Erreur de connexion au serveur');
        } finally {
            setLoading(false);
        }
  }
  
  return (
    <div>
      <h4>l article {articles.title}</h4>
      <p>{articles.content} </p>
      <h5>COMMENTAIRE</h5>
        <form onSubmit={handleSubmit}>
            <textarea 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                required 
                disabled={loading}
            ></textarea>

            
            <button type="submit" disabled={loading}>
                {loading ? 'Submit...' : 'Enregistrer'}
            </button>
        </form>

      <ul>
      {comments && comments.length > 0 && (comments.map((item) => {
        return (<li key={item.id}>{item.content} par {item.author}</li>)
      })) }
      </ul>
    </div>
  );
}

export default ArticleShow;
