import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ChatShow() {
  const { id } = useParams();
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [receiver, setReceiver] = useState();

  const loadCurrentUser = () => {
    fetch(`/me`, {
      credentials: 'include'})
      .then(response => response.json())
      .then(data => {
        console.log('Données reçues :', data);
        setUser(data.data);
      })
  };

  const loadReceiver = () => {
    fetch(`/api/users/${id}`, {credentials: 'include'})
      .then(response => response.json())
      .then(data => {
        console.log('Données reçues :', data);
        setReceiver(data);
      })
  };

  const loadMessages = () => {
    fetch(`/api/messages?user.id=${id}`, {credentials: 'include'})
      .then(response => response.json())
      .then(data => {
        console.log('Données reçues :', data);
        setMessages(data.member);
      })
  };

  useEffect(() => {
    loadReceiver()
  }, [])

  useEffect(() => {
    loadCurrentUser()
  }, [])

  useEffect(() => {
    loadMessages()
  }, [id])

  const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/ld+json',
                    'Accept': 'application/ld+json'
                },
                body: JSON.stringify({
                  content:message,
                  sender: `/api/users/${user ? user.id : 1}`,
                  receiver: `/api/users/${id}`
                }),
            });

            loadMessages()
        } catch (err) {
            console.error('Erreur de connexion: '+err);
            alert('Erreur de connexion au serveur');
        } finally {
            setLoading(false);
        }
  }
  
  return (
    <>
    <div className="container mt-4">
      <div className="chat-header mb-4">
          <h2 className="text-primary">
              <i className="fas fa-comments me-2"></i>
              Pseudo {receiver ? receiver.email : id}
          </h2>
      </div>

      <div className="messages-container mb-4">

        {messages && messages.map((message) => {
          if(message.sender.id === message.sender.id) {
            return (
              <div key={message.id} className="message-sent d-flex justify-content-end mb-3">
                    <div className="message-bubble sent">
                        <div className="message-content">{ message.content }</div>
                        <div className="message-time">
                            { message.createdAt }
                        </div>
                    </div>
                </div>
            )
          }

          return (
            <div key={message.id}  className="message-received d-flex justify-content-start mb-3">
              <div className="message-bubble received">
                  <div className="message-sender">
                      { message.sender.pseudo }
                  </div>
                  <div className="message-content">{ message.content }</div>
                  <div className="message-time" style={{fontSize: "0.75rem", color: "#6c757d", marginTop: "4px"}}>
                      { message.createdAt }
                  </div>
              </div>
            </div>
          )
        })}
                
    </div>

    <div className="chat-input-container">

        <form onSubmit={handleSubmit}>
            <div className="flex-grow-1">
              <textarea 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  required 
                  disabled={loading}
              ></textarea>
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Submit...' : 'Envoyer'}
            </button>
            
        </form>
    </div>
    </div>
    </>
  );
}

export default ChatShow;
