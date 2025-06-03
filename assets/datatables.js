import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-responsive-bs5';
// import './articles_list.js';

window.$= $;
window.jQuery= $ ;

document.addEventListener('DOMContentLoaded',function(){
    console.log('DAATATABLE');
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
                url: 'https://cdn.datatables.net/plug-ins/2.3.1/i18n/fr-FR.json',
                search:"Rechercher 🔍 ",
                paginate:{
                    previous: "<<",
                    next: ">>"
                },
                info: "Affichage de _START_/_TOTAL_ articles à _END_/_TOTAL_ articles"
            },
            initComplete: function () {
            $('#maTable_length').appendTo('#datatable-length').show();
            $('#maTable_filter').appendTo('#datatable-search').show();
        }
        
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
                url: 'https://cdn.datatables.net/plug-ins/2.3.1/i18n/fr-FR.json',
                search:"Rechercher 🔍 ",
                paginate:{
                    previous: "<<",
                    next: ">>"
                },
                info: "Affichage de _START_/_TOTAL_ articles à _END_/_TOTAL_ articles"
            },
            dom: '<"row justify-content-center mb-3"<"col-md-auto"l><"col-md-auto"f>>rt<"row mt-3"<"col-md-6"i><"col-md-6 text-end"p>>'

        });
    }
    
})