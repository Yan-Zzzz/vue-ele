import axios from 'axios'
/**
 * 获取商店列表
 */
export function getStoreList() {
    return axios
        .get("/api/store")
        .then(response => {
           // console.log(response.data.data[0].seller)
            return response.data.data;
        })
        .catch(error => {
            console.log(error);
        });
}

/**
 * 获取单个商店
 * @param {Number} storeId 
 */
export function getStore(storeId) {
    // return axios.get(`www.example.com/store/${storeId}`);
    return axios
       .get("/api/store")
        .then(response => {
           for(var i=0;i<response.data.data.length;i++){
               var seller=response.data.data[i].seller;
            //    console.log(storeId);
                if(seller.name==storeId){
                    return seller;
                }
           }
           console.log(seller);
        })
        .catch(error => {
            console.log(error);
        });
}


