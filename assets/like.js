import $ from 'jquery';

window.$ = $;
window.jQuery = $;

document.addEventListener('DOMContentLoaded', function () {
    const likeBtn = $('#like-btn');
    
    if (likeBtn.length) {
        likeBtn.on('click', function (e) {
            e.preventDefault();
            console.log('like clicker');
            
            const articleId = $(this).data('id');
            
            // Vérification que l'ID existe
            if (!articleId) {
                console.error('ID article manquant');
                return;
            }
            
            // Désactiver le bouton pendant la requête
            likeBtn.prop('disabled', true);
            
            $.ajax({
                url: `/articles/${articleId}/like`,
                type: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json'
                },
                success: function (data) {
                    console.log('Réponse reçue:', data);
                    
                    if (data.liked) {
                        likeBtn.html('<i class="fas fa-heart"></i> <span id="like-count">' + data.likesCount + '</span>');
                        likeBtn.removeClass('btn-outline-primary').addClass('btn-danger');
                    } else {
                        likeBtn.html('<i class="far fa-heart"></i> <span id="like-count">' + data.likesCount + '</span>');
                        likeBtn.removeClass('btn-danger').addClass('btn-outline-primary');
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Erreur AJAX:', error);
                    console.error('Status:', status);
                    console.error('Response:', xhr.responseText);
                    
                    if (xhr.status === 401) {
                        alert('Vous devez être connecté pour liker un article');
                    } else {
                        alert('Une erreur est survenue. Veuillez réessayer.');
                    }
                },
                complete: function() {
                    // Réactiver le bouton
                    likeBtn.prop('disabled', false);
                }
            });
        });
    }
});