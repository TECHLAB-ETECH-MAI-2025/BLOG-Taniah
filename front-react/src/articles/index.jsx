import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';

const ArticlesIndex = () => {
  const [discussionPanelActive, setDiscussionPanelActive] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [contentShifted, setContentShifted] = useState(false);
    
  const [article, setArticle] = useState([]);
  const [articleEnCours, setArticleEnCours] = useState(null);
  const [formData, setFormData] = useState({titre:'' ,contenu:''});
  const [editId, setEditId] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    fetch('http://localhost:8000/api/users')
      .then(response => response.json())  
      .then(data => {
        console.log('Données reçues pour les users:', data);
        setUsers(data.member || []);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/user')
      .then(response => response.json())  
      .then(data => {
        console.log('Données reçues pour currentUser:', data);
        setUsers(data.member || []);
      });
  }, []);

  const userConnecte = 'CurrentUser';
  const handleDiscussionToggle = () => {
    setDiscussionPanelActive(true);
    setOverlayActive(true);
    if (window.innerWidth > 768) {
      setContentShifted(true);
    }
  };

  const closeDiscussionPanel = () => {
    setDiscussionPanelActive(false);
    setOverlayActive(false);
    setContentShifted(false);
  };

//   ALLER DANS LA DISCUSSION
  const handleUserClick = (userId) => {
    window.location.href = `/chat/${userId}/show`;
  };


//   CREATION NOUVEAU ARTICLE
  const handleCreateArticle = () => {
    console.log('Créer un article');
  };


//useEffetc pour : RESIZE BORD DE DISCUSSION   
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setContentShifted(false);
      } else if (discussionPanelActive) {
        setContentShifted(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

    
  }, [discussionPanelActive]);

//   DATATABLES
  const colonnes=[
    {
        name: 'Titre',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: 'Contenus',
        selector: row => row.content,
        sortable: true,
    },
    {
        name: 'Créé le',
        selector: row => row.created_at,
        sortable: true,
    },
    {
        name: 'Actions',
        cell: row =>(
          <div style={{ display:'flex'}}>
              <button onClick={()=> navigate(`/articles/${row.id}/show`)} style={{padding: '6px 12px',border: 'none',borderRadius: '5px',
                background: '#007bff',color: 'white',fontWeight: 'bold',cursor: 'pointer',}}>
              Voir commentaire
              </button>,
              <button onClick={() => navigate(`/articles/${row.id}/edit`)} style={{padding: '6px 12px',border: 'none',borderRadius: '5px',
                background: '#007bff',color: 'white',fontWeight: 'bold',cursor: 'pointer',}}>
              Modifier
              </button>
            </div>
        ),
        ignoreRowClick :true,
        allowOverflow: true,
        button: true,
    }
   ];

  useEffect(() => {
    fetch('http://localhost:8000/api/articles')
      .then(response => response.json())
      .then(data => {
        console.log('Données reçues :', data);
        setArticle(data.member || []);
      });
  }, []);

  const styles = {
    body: {
      backgroundColor: '#f0f4f8'
    },
    mainHeader: {
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      padding: '20px',
      borderRadius: '15px 15px 0 0',
      marginBottom: '0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px'
    },
    datatableControls: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '15px',
      flexWrap: 'wrap',
      margin: '15px 0'
    },
    datatableSelect: {
      minWidth: '180px',
      maxWidth: '220px',
      padding: '5px 10px',
      borderRadius: '8px',
      border: '1px solid #ced4da',
      backgroundColor: '#fff'
    },
    pageTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      margin: '0',
      color: '#495057'
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    btnCreate: {
      background: '#007bff',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '25px',
      color: 'white',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    discussionToggle: {
      background: '#6c757d',
      border: 'none',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      color: 'white',
      fontSize: '1.2rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    discussionPanel: {
      position: 'fixed',
      top: '0',
      right: discussionPanelActive ? '0' : '-20vw',
      width: '20vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      transition: 'right 0.3s ease',
      zIndex: '1000',
      boxShadow: '-5px 0 20px rgba(0,0,0,0.1)'
    },
    discussionHeader: {
      padding: '20px',
      borderBottom: '1px solid #dee2e6',
      position: 'relative'
    },
    discussionHeaderTitle: {
      margin: '0',
      fontWeight: '600',
      color: '#495057'
    },
    closeDiscussion: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'none',
      border: 'none',
      color: '#6c757d',
      fontSize: '1.5rem',
      cursor: 'pointer',
      transition: 'color 0.3s ease'
    },
    usersList: {
      padding: '0',
      margin: '0',
      listStyle: 'none',
      maxHeight: 'calc(100vh - 80px)',
      overflowY: 'auto'
    },
    userItem: {
      padding: '15px 20px',
      borderBottom: '1px solid #dee2e6',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      color: '#495057'
    },
    userAvatar: {
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      background: '#007bff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      marginRight: '12px',
      fontSize: '0.9rem'
    },
    card: {
      border: 'none',
      borderRadius: '0 0 15px 15px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
    },
    tableHeader: {
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      border: 'none',
      fontWeight: '600',
      color: '#495057',
      padding: '18px 15px'
    },
    overlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.3)',
      zIndex: '999',
      opacity: overlayActive ? '1' : '0',
      visibility: overlayActive ? 'visible' : 'hidden',
      transition: 'all 0.3s ease'
    },
    containerFluid: {
      marginRight: contentShifted ? '20vw' : '0',
      transition: 'margin-right 0.3s ease'
    }
  };

  // Media query pour mobile
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    styles.discussionPanel.width = '80vw';
    styles.discussionPanel.right = discussionPanelActive ? '0' : '-80vw';
    styles.containerFluid.marginRight = '0';
    styles.mainHeader.flexDirection = 'column'; 
    styles.mainHeader.gap = '15px';
  }

  return (
    <div style={styles.body}>
      <div style={styles.overlay} onClick={closeDiscussionPanel}></div>

      <div style={styles.containerFluid}>
        <div style={styles.mainHeader}>
          <h1 style={styles.pageTitle}>
            <i className="fas fa-newspaper" style={{marginRight: '8px'}}></i>
            Mes Articles
          </h1>

            {/* DATATABLES */}
          <div style={styles.datatableControls}>
                <div>
                    <input 
                        type="search" 
                        placeholder="Rechercher..." 
                        style={styles.datatableSelect}
                    />
                </div>
          </div>

          <div style={styles.headerActions}>
            
            <button 
              onClick={handleCreateArticle}
              style={styles.btnCreate}
              onMouseOver={(e) => {
                e.target.style.background = '#0056b3';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#007bff';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <Link style={{color:'white'}} to={'/articles/new'}><i className="fas fa-plus" style={{marginRight: '8px'}}></i> Créer un article</Link>
              
              
             
            </button>
            
            <button 
              style={styles.discussionToggle}
              onClick={handleDiscussionToggle}
              onMouseOver={(e) => {
                e.target.style.background = '#495057';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#6c757d';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="fas fa-comments"></i>
            </button>
          </div>
        </div>

        <div style={styles.card}>
          <div style={{padding: '0'}}>
            <DataTable
                columns={colonnes}
                data={article}
                pagination
                paginationPerPage={1}  
                highlightOnHover
                responsive
            />
          </div>
        </div>
      </div>

      <div style={styles.discussionPanel}>
        <div style={styles.discussionHeader}>
          <h5 style={styles.discussionHeaderTitle}>
            <i className="fas fa-users" style={{marginRight: '8px'}}></i>
            Discussions
          </h5>
          <button 
            style={styles.closeDiscussion}
            onClick={closeDiscussionPanel}
            onMouseOver={(e) => e.target.style.color = '#495057'}
            onMouseOut={(e) => e.target.style.color = '#6c757d'}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <ul style={styles.usersList}>
          {users.filter(user => user.pseudo !== userConnecte).map(user => (
            <li 
              key={user.id}
              style={styles.userItem}
              onClick={() => handleUserClick(user.id)}
              onMouseOver={(e) => e.target.style.background = 'rgba(0, 123, 255, 0.1)'}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              <div style={styles.userAvatar}>
                {user.pseudo.slice(0, 2).toUpperCase()}
              </div>
              <div><Link to={"/chat/" + user.id + "/show"}>{user.pseudo}</Link></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticlesIndex;