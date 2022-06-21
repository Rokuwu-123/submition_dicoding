let controller = require('../controllers/handlers');

routes = [
    {
        method : 'POST',
        path : '/books',
        handler : controller.simpan_buku
    },
    {
        method : 'GET',
        path : '/books/{id_buku?}',
        handler : controller.tampil_semua
    },
    {
        method : 'PUT',
        path : '/books/{id_buku}',
        handler : controller.ubah_buku
    },
    {
        method : 'GET',
        path : '/test',
        handler : (request,h)=>{
            return h.response('respons_data')
        }
    },
    {
        method : 'DELETE',
        path : '/books/{id_buku}',
        handler : controller.hapus_buku
    }
]

module.exports = routes