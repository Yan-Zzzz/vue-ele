import axios from 'axios';

/**
 * 获取物品列表
 */
export function fetchGoodList() {
    return axios.get('www.example.com/goods')
        .then(res => {
            // 写一些处理数据的业务代码
            return res.data; // 比如提取data属性
        });
}

/**
 * 获取物品详情
 * @param {Number} goodsId 
 */
export function fetchGoodsDetail(goodsId) {
    return axios.get(`www.example.com/goods/${goodsId}`);
}