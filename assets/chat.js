import $ from 'jquery';

window.$ = $;
window.jQuery = $;

console.log('chat');
document.addEventListener('DOMContentLoaded', function() {
    $('#chat_envoyer').on('click', function(e) {
        console.log('click chat');
        e.preventDefault();
        
        // Sélectionner le formulaire, pas le bouton
        const $form = $(this).closest('form');
        
        $.ajax({
            type: $form.attr('method') || 'POST',
            url: $form.attr('action') || window.location.href,
            data: $form.serialize(),
            success: function(data) {
                console.log('ok');
                // Récupérer le contenu du textarea avant de le vider
                const content = $form.find('textarea').val();
                
                // Ajouter le message à la liste (ajustez le sélecteur selon votre HTML)
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
                
                // Vider le textarea
                $form.find('textarea').val('');
                
                // Faire défiler vers le bas pour voir le nouveau message
                $('.messages-container').scrollTop($('.messages-container')[0].scrollHeight);
            },
            error: function(xhr, status, error) {
                console.error('Erreur lors de l\'envoi du message:', error);
                alert('Erreur lors de l\'envoi du message');
            }
        });
    });
});