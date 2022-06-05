libraries = {
    hitung_object : async(vObject)=>{
        jm_data = 0;
        for (const vKey in vObject) {
           jm_data++;
        };
    
        return jm_data;
    }
};

module.exports = libraries;