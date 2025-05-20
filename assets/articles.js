import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-responsive-bs5';

window.$= $;
window.jQuery= $ ;

document.addEventListener('DOMContentLoaded',function(){
    $('#matable').DataTable();
})