import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ArticleShow() {
  const { id } = useParams();
  const [articles, setArticles] = useState({ title:'', content:''});

  useEffect(() => {
    fetch(`http://localhost:8000/api/articles/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Données reçues :', data);
        setArticles(data);
      });
  }, [id]);
  
  return (
    <div>
      <h4>l article {articles.title}</h4>
      <p>{articles.content} </p>
      <h5>COMMENTAIRE</h5>
      <textarea name="" id=""></textarea>
    </div>
  );
}

export default ArticleShow;
