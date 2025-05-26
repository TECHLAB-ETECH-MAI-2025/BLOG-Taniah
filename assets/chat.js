import $ from 'jquery';

window.$ = $;
window.jQuery = $;

document.addEventListener('DOMContentLoaded', function() {
    $('#chat_envoyer').on('click', function(e) {
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
                $('.messages-container').append(
                    '<div class="message">' +
                        '<strong>Vous (' + new Date().toLocaleTimeString() + '):</strong> ' +
                        content +
                    '</div>'
                );
                
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