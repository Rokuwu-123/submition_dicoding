const { nanoid } = require('nanoid');

models = {
    simpan_baru : async(data_request)=>{

        return {
            "id": nanoid(),
            "name": data_request.name,
            "year": data_request.year,
            "author": data_request.author,
            "summary": data_request.summary,
            "publisher": data_request.publisher,
            "pageCount": data_request.pageCount,
            "readPage": data_request.readPage,
            "finished": data_request.readPage == data_request.pageCount ? true : false,
            "reading": false,
            "insertedAt": new Date().toISOString(),
            "updatedAt": new Date().toISOString()
        };
    },

    data_buku : async(daftar_buku)=>{

        let data_kembali = []
    
        daftar_buku.forEach(data => {
            vdata_buku = {
                id : data.id,
                name : data.name,
                publisher : data.publisher
            }
    
            data_kembali.push(vdata_buku)
        });
    
        return data_kembali
    },
    
    detail_buku :async(daftar_buku,parameter)=>{
        let detail_data = daftar_buku.find(data=> data.id == parameter.id_buku)
    
        return detail_data
    }
};

module.exports = models;