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
    }
]

module.exports = routes