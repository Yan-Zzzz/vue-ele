import axios from 'axios';



/**
 * 获取商店列表
 */
export function getStore() {
    return axios
        .get("/api/store")
        .then(response => {
            console.log(this.$data);
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
export function fetchStoreInfo(storeId) {
    return axios.get(`www.example.com/store/${storeId}`);
}