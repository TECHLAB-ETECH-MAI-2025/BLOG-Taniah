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

                $('#comments').append(
                    '<tr>'+
                        '<td>'+content+'</td>'+
                        'par' +'<td>'+auteur+'</td> le '+
                    '</tr>'
                );
                $form.find('textarea').val('');
            }
        })
    })

})
