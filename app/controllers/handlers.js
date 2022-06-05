let models = require("../models/models");
let libraries = require("../libraries/libraries");
require("dotenv").config();

controller = {
    simpan_buku : async(request,h)=>{
        let respons_data = "";
        let respons_code = 0;
        
        try {
    
            await libraries.validasi_ubah(request.payload)
    
            let data_baru = await models.simpan_baru(request.payload);
    
            respons_data = {
                "status": "success",
                "message": "Buku berhasil ditambahkan",
                "data": {
                    "bookId": data_baru.id
                }
            };
            respons_code = 201;
            
        } catch (error) {
            let error_respons = {
                "status" : "error",
                "message" : "Buku gagal ditambahkan"
            };
            let error_code = 500;
    
            if( error.code != 500){
                error_respons  = error.respons;
                error_code = error.code;
            };
    
            respons_data = error_respons;
            respons_code = error_code;
        };

        return h.response(respons_data).code(respons_code);
    },

    tampil_semua : async(request,h)=>{
        let respons_data = "";
        let respons_code = 0;
        
        try {
    
            let data_buku = "";
            
            if(await libraries.hitung_object(request.params) == 0){
    
                data_buku = await models.data_buku();
                
            } else{
    
                data_buku = await models.detail_buku(request.params);
    
                if (await libraries.hitung_object(data_buku) == 0) {
                    err = {};
                    err.code = 404;
                    err.respons = {
                        status : "fail",
                        message : "Buku tidak ditemukan"
                    };
                    throw err;
                };
            };

            if(await libraries.hitung_object(request.query) > 0){
                
                if(request.query.name != '' || typeof request.query.name != 'undefined'){

                    data_buku = await models.cari_nama(request.query.name);

                }else if(typeof request.query.reading != 'undefined'){

                    data_buku = await models.cari_nama(request.query.reading);

                }else if(typeof request.query.finished != 'undefined'){

                    data_buku = await models.cari_nama(request.query.finished);

                };
            }

            respons_data = {
                "status": "success",
                "data": {
                    "books": data_buku
                }
            };

            respons_code = 200;
            
        } catch (error) {
            let error_respons = {
                "status" : "error",
                "message" : "Buku gagal ditampilkan"
            };
            let error_code = 500;
            
            if( error.code != 500){
                error_respons  = error.respons;
                error_code = error.code;
            };
    
            respons_data = error_respons
            respons_code = error_code;
        };

        return h.response(respons_data).code(respons_code);
        
    },

    ubah_buku : async(request, h)=>{
        let respons_code = "";
        let respons_data = "";

        try {

            await libraries.validasi_ubah(request.payload);
            
            data_buku = await models.detail_buku(request.params);
    
            if (await libraries.hitung_object(data_buku) == 0) {
                err = {};
                err.code = 404;
                err.respons = {
                    status : "fail",
                    message : "Gagal memperbarui buku. Id tidak ditemukan"
                };
                throw err;
            };

            await models.ubah_buku(request.payload);

            respons_data = {
                "status" : "success",
                "message" : "Buku berhasil diperbarui"
            };

            respons_code = 200;

        } catch (error) {
            let error_respons = {
                "status" : "error",
                "message" : "Buku gagal diubah"
            };
            let error_code = 500;
            
            if( error.code != 500){
                error_respons  = error.respons;
                error_code = error.code;
            };
    
            respons_data = error_respons;
            respons_code = error_code;
        };
        return h.response(respons_data).code(respons_code);
    },

    hapus_buku : async(request, h)=>{
        let respons_code = "";
        let respons_data = "";

        try {

            data_buku = await models.detail_buku(request.params);
    
            if (await libraries.hitung_object(data_buku) == 0) {
                err = {};
                err.code = 404;
                err.respons = {
                    status : "fail",
                    message : "Buku gagal dihapus. Id tidak ditemukan"
                };
                throw err;
            };

            await models.hapus_buku(request.params);
            
            respons_data = {
                "status" : "success",
                "message" : "Buku berhasil dihapus"
            };

            respons_code = 200;
            
        } catch (error) {
            let error_respons = {
                "status" : "error",
                "message" : "Buku gagal dihapus"
            };
            let error_code = 500;
            
            if( error.code != 500){
                error_respons  = error.respons;
                error_code = error.code;
            };
    
            respons_data = error_respons;
            respons_code = error_code;
        };
        return h.response(respons_data).code(respons_code);
    }
};

module.exports = controller;