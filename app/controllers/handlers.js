let models = require("../models/models")
let libraries = require("../libraries/libraries")
require("dotenv").config();

controller = {
    simpan_buku : async(request,h)=>{
        let respons_data = "";
        let respons_code = 0;
        
        try {
    
            await libraries.validasi_ubah(request.payload)
    
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
            };
            respons_code = 201
            
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
    
            respons_data = error_respons
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
    
                data_buku = await models.data_buku(JSON.parse(process.env.DATA));
                
            } else{
    
                data_buku = await models.detail_buku(JSON.parse(process.env.DATA),request.params);
    
                if (await libraries.hitung_object(data_buku) == 0) {
                    err = {};
                    err.code = 404;
                    err.respons = {
                        status : "fail",
                        message : "Buku tidak ditemukan"
                    };
                    throw err;
                }
            };

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
        let respons_code = '';
        let respons_data = '';

        try {

            await libraries.validasi_ubah(request.payload)
            
            data_buku = await models.detail_buku(JSON.parse(process.env.DATA),request.params);
    
            if (await libraries.hitung_object(data_buku) == 0) {
                err = {};
                err.code = 404;
                err.respons = {
                    status : "fail",
                    message : "Gagal memperbarui buku. Id tidak ditemukan"
                };
                throw err;
            };

            hasil_ubah = await models.ubah_buku(JSON.parse(process.env.DATA));

            process.env.DATA = JSON.stringify(hasil_ubah);

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

            data_buku = await models.detail_buku(JSON.parse(process.env.DATA),request.params);
    
            if (await libraries.hitung_object(data_buku) == 0) {
                err = {};
                err.code = 404;
                err.respons = {
                    status : "fail",
                    message : "Buku gagal dihapus. Id tidak ditemukan"
                };
                throw err;
            };

            hasil_hapus = await models.hapus_buku(JSON.parse(process.env.DATA),request.params);

            process.env.DATA = JSON.stringify(hasil_hapus); 
            
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