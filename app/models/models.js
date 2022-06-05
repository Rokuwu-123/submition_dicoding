const { nanoid } = require('nanoid');
require("dotenv").config();

let daftar_buku = JSON.parse(process.env.DATA);

models = {
    simpan_baru : async(data_request)=>{

        let data_baru = {
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

        daftar_buku.push(data_baru);
        process.env.DATA = JSON.stringify(daftar_buku);
        
        return data_baru;
    },

    data_buku : async()=>{

        let data_kembali = [];
    
        daftar_buku.forEach(data => {
            data_kembali.push({
                id : data.id,
                name : data.name,
                publisher : data.publisher
            });
        });
    
        return data_kembali;
    },
    
    detail_buku : async(parameter)=>{

        return daftar_buku.find(data=> data.id == parameter.id_buku);

    },

    ubah_buku : async(parameter,body)=>{

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
                daftar_buku[index].finished = body.readPage == body.pageCount ? true : false;
                daftar_buku[index].updatedAt = new Date().toISOString();
            };
        });

        process.env.DATA = JSON.stringify(daftar_buku);
    },

    hapus_buku : async(parameter)=>{

        daftar_buku.find((data, index)=>{
            if(data.id == parameter.id_buku){
                delete daftar_buku[index];
            };
        });

        process.env.DATA = JSON.stringify(daftar_buku);
    },

    cari_nama : async(nama)=>{

        data_kembali = [];

        daftar_buku.find((data, index)=>{
            if(data.name == nama){
                data_kembali.push({
                    id : daftar_buku[index].id,
                    name : daftar_buku[index].name,
                    publisher : daftar_buku[index].publisher
                });
            };
        });

        return data_kembali;
    },

    cari_reading : async(nilai_reading)=>{
        data_kembali = [];

        daftar_buku.find((data, index)=>{
            switch (nilai_reading) {
                case 0:
                    if(!data.reading){
                        data_kembali.push({
                            id : daftar_buku[index].id,
                            name : daftar_buku[index].name,
                            publisher : daftar_buku[index].publisher
                        });
                    };
                    break;
                
                case 1:
                    if(data.reading){
                        data_kembali.push({
                            id : daftar_buku[index].id,
                            name : daftar_buku[index].name,
                            publisher : daftar_buku[index].publisher
                        });
                    };
            
                default:
                    err = {};
                    err.code = 400;
                    err.respons = {
                        status : "fail",
                        message : "Nilai reading tidak valid"
                    };
                    throw err;
            };
            
        });

        return data_kembali;
    },

    cari_finished : async(nilai_finished)=>{
        data_kembali = [];

        daftar_buku.find((data, index)=>{
            switch (nilai_finished) {
                case 0:
                    if(!data.finished){
                        data_kembali.push({
                            id : daftar_buku[index].id,
                            name : daftar_buku[index].name,
                            publisher : daftar_buku[index].publisher
                        });
                    };
                    break;
                
                case 1:
                    if(data.finished){
                        data_kembali.push({
                            id : daftar_buku[index].id,
                            name : daftar_buku[index].name,
                            publisher : daftar_buku[index].publisher
                        });
                    };
            
                default:
                    err = {};
                    err.code = 400;
                    err.respons = {
                        status : "fail",
                        message : "Nilai finished tidak valid"
                    };
                    throw err;
            };
            
        });

        return data_kembali;
    }
};

module.exports = models;