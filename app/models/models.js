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

        let data_kembali = [];
    
        daftar_buku.forEach(data => {
            vdata_buku = {
                id : data.id,
                name : data.name,
                publisher : data.publisher
            };
    
            data_kembali.push(vdata_buku);
        });
    
        return data_kembali;
    },
    
    detail_buku : async(daftar_buku,parameter)=>{

        return daftar_buku.find(data=> data.id == parameter.id_buku);

    },

    ubah_buku : async(daftar_buku,parameter,body)=>{

        daftar_buku.find((data, index)=>{
            if(data.id == parameter.id_buku){
                daftar_buku[index].name = body.name;
                daftar_buku[index].year = body.year;
                daftar_buku[index].author = body.author;
                daftar_buku[index].summary = body.summary;
                daftar_buku[index].publisher = body.publisher;
                daftar_buku[index].pageCount = body.pageCount;
                daftar_buku[index].readPage = body.readPage;
                daftar_buku[index].reading = body.reading;
                daftar_buku[index].finished = body.readPage == body.pageCount ? true : false,
                daftar_buku[index].updatedAt = new Date().toISOString();
            };
        });

        return daftar_buku;
    },

    hapus_buku : async(daftar_buku,parameter)=>{

        daftar_buku.find((data, index)=>{
            if(data.id == parameter.id_buku){
                delete daftar_buku[index]
            };
        });

        return daftar_buku;

    }
};

module.exports = models;