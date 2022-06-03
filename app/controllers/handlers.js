let models = require('../models/models')
let libraries = require('../libraries/libraries')
require('dotenv').config();

exports.simpan_buku = async(request,h)=>{
    let respons_data = '';
    let respons_code = 0;
    
    try {

       if (typeof request.payload.name == 'undefined' || request.payload.name == '') {
           let err = {};
           err.code = 400;
           err.message = "Gagal menambahkan buku. Mohon isi nama buku";
           throw err;
       };

       if (request.payload.readPage > request.payload.pageCount){
        let err = {};
        err.code = 400;
        err.message = "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount";
        throw err;
       };

       let data_baru = await models.simpan_baru(request.payload);

       let database = JSON.parse(process.env.DATA)
       database.push(data_baru)
       process.env.DATA = JSON.stringify(database)

       respons_data = {
            "status": "success",
            "message": "Buku berhasil ditambahkan",
            "data": {
                "bookId": data_baru.id
            }
        }
       respons_code = 201
        
    } catch (error) {
        let error_message = "Buku gagal ditambahkan";
        let error_code = 500;

        if( error.code != 500){
            error_message  = error.message;
            error_code = error.code;
        };

        respons_data = {
            "status" : "error",
            "message" : error_message
        };
        respons_code = error_code;
    }
    return h.response(respons_data).code(respons_code);
};

exports.tampil_semua = async(request,h)=>{
    let respons_data = '';
    let respons_code = 0;
    
    try {

        let data_buku = ''
        
        if(await libraries.hitung_object(request.params) == 0){

            data_buku = await models.data_buku(JSON.parse(process.env.DATA));
            
        } else{

            data_buku = await models.detail_buku(JSON.parse(process.env.DATA),request.params);

            if (await libraries.hitung_object(data_buku) == 0) {
                err = {}
                err.code = 404
                err.message = "Buku tidak ditemukan"
                throw err
            }
        }
        respons_data = {
            "status": "success",
            "data": {
                "books": data_buku
            }
        }
        respons_code = 200
        
    } catch (error) {
        let error_message = "Buku gagal ditambahkan";
        let error_code = 500;
        
        if( error.code != 500 && typeof error.code != 'undefined'){
            error_message  = error.message;
            error_code = error.code;
        };

        respons_data = {
            "status" : "error",
            "message" : error_message
        };
        respons_code = error_code;
    }
    return h.response(respons_data).code(respons_code);
    
};

exports.ubah_buku = async(request,h)=>{
    
}

exports.hapus_buku = async(request,h)=>{
    
}