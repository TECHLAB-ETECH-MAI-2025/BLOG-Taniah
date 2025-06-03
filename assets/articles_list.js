import $ from 'jquery';

window.$= $;
window.jQuery= $ ;

document.addEventListener('DOMContentLoaded',function(){
    $('#commentForm').on('submit',function(e){
        e.preventDefault();
        const $form=$(this);
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            success: function(){
                const content = $form.find('textarea').val();
                const auteur = $form.find('#comment_form_author').val();

                $('#comments').append(`
                        <tr>
                        <td>${content}</td>
                        <td> par ${auteur} le ${new Date().toLocaleTimeString([],{
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false})}</td> 
                    </tr>`);
                $form.find('textarea').val('');
            }
        })
    })

})
