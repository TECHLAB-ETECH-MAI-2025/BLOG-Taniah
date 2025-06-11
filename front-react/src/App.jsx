import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignForm from './auth/register';
import LoginForm from './auth/login';
import ArticleIndex from './articles/index';
import ArticleShow from './articles/show';
import ArticleEdit from './articles/edit';
import ChatShow from './chat/show';
import ArtcileNew from './articles/new';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/articles" element={<ArticleIndex />} />
        <Route path="/articles/:id/show" element={<ArticleShow />} />
        <Route path="/articles/:id/edit" element={<ArticleEdit />} />
        <Route path="/chat/:id/show" element={<ChatShow />} />
        <Route path='/articles/new' element={<ArtcileNew/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
