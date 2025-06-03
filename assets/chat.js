import $ from 'jquery';

window.$ = $;
window.jQuery = $;

console.log('chat');

document.addEventListener('DOMContentLoaded', function() {
    let envoyer=$('#chat_envoyer');

    const idUser=$('#idUser').val();
    const url = "http://localhost:8080/.well-known/mercure?topic=/chat/"+idUser;
    const eventSource=new EventSource(url);
    eventSource.onmessage=function(event){
        const data=JSON.parse(event.data);
        
        $('.messages-container').append(`
                    <div class="message-received d-flex justify-content-start mb-3">
                        <div class="message-bubble received" style="max-width: 70%; background: white; color: #333; padding: 12px 16px; border-radius: 18px 18px 18px 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border: 1px solid #e9ecef;">
                            <div class="message-sender" style="font-weight: 600; font-size: 0.85rem; color: #6c757d; margin-bottom: 4px;">
                                ${data.sender}
                            </div>
                            <div class="message-content">${data.message}</div>
                            <div class="message-time" style="font-size: 0.75rem; opacity: 0.8; margin-top: 4px;">
                                ${data.timestamp}
                            </div>
                        </div>
                    </div>
                `);
        $('.messages-container').scrollTop($('.messages-container')[0].scrollHeight);
    }
    eventSource.onerror = function(err) {
        console.error("Erreur EventSource:", err);
    };

    envoyer.on('click', function(e) {
        console.log('click chat');
        e.preventDefault();
        
        // Sélectionner le formulaire, pas le bouton
        const $form = $(this).closest('form');

        $.ajax({
            type: $form.attr('method') || 'POST',
            url: $form.attr('action') || window.location.href,
            data: $form.serialize(),
            success: function(data) {
                const content = $form.find('textarea').val();
                $('.messages-container').append(`
                    <div class="message-sent d-flex justify-content-end mb-3">
                        <div class="message-bubble sent" style="max-width: 70%; background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white; padding: 12px 16px; border-radius: 18px 18px 4px 18px; box-shadow: 0 2px 4px rgba(0,123,255,0.3);">
                            <div class="message-content">${content}</div>
                            <div class="message-time" style="font-size: 0.75rem; opacity: 0.8; margin-top: 4px;">
                                ${new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                            </div>
                        </div>
                    </div>
                `);
                
                $form.find('textarea').val('');
                
                $('.messages-container').scrollTop($('.messages-container')[0].scrollHeight);
            },
            error: function(xhr, status, error) {
                console.error('Erreur lors de l\'envoi du message:', error);
                alert('Erreur lors de l\'envoi du message');
            }
        });
    });
});