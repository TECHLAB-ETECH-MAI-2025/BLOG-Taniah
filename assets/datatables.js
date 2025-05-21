import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-responsive-bs5';
// import './commentaires.js';

window.$= $;
window.jQuery= $ ;

document.addEventListener('DOMContentLoaded',function(){
    if($('#matableArticles').length){
        $('#matableArticles').DataTable({
            ajax: '/api/articles',
            pageLength: 1,
            columns: [
                {data: 'titre'},
                {data: 'contenu'},
                {data: 'date'},
                {data: 'actions', orderable: false, searchable: false }
            ],
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/fr-FR.json'
            },

        });
    }
    
    if($('#matableCategories').length){
        $('#matableCategories').DataTable({
            ajax: '/api/categories',
            pageLength: 1,
            columns: [
                {data: 'titre'},
                {data: 'description'},
                {data: 'date'},
                {data: 'actions', orderable: false, searchable: false }
            ],
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/fr-FR.json'
            },

        });
    }
    
})