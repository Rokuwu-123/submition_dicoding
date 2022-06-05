libraries = {
    hitung_object : async(vObject)=>{
        jm_data = 0;
        for (const vKey in vObject) {
           jm_data++;
        };
    
        return jm_data;
    },

    validasi_ubah : async(body)=>{
        if (typeof body.name == "undefined" || body.name == "") {
            let err = {};
            err.code = 400;
            err.respons = {
                status : "fail",
                message : "Gagal menambahkan buku. Mohon isi nama buku"
            };
           throw err;
        };

        if (body.readPage > body.pageCount) {
            let err = {};
            err.code = 400;
            err.respons = {
                status : "fail",
                message : "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
            };
            throw err;
        };
    },

    
};

module.exports = libraries;