import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignForm from './auth/register';
import LoginForm from './auth/login';
import ArticleIndex from './articles/index';
import ArticleShow from './articles/show';
import ArticleEdit from './articles/edit';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/articles" element={<ArticleIndex />} />
        <Route path="/articles/:id/show" element={<ArticleShow />} />
        <Route path="/articles/:id/edit" element={<ArticleEdit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
