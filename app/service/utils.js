'use strict';

const Service = require('egg').Service;

class ToolsService extends Service {
    async priceAndStock(arr) {
        let sumStock = 0;
        let minPrice = arr[0].price;
        let maxPrice = arr[0].price;
        let minOriginalPrice = arr[0].original_price;
        let maxOriginalPrice = arr[0].original_price;
        arr.forEach(item => {
            item.price > maxPrice ? maxPrice = item.price : maxPrice;
            item.price < minPrice ? minPrice = item.price : minPrice;
            item.original_price > maxOriginalPrice ? maxOriginalPrice = item.original_price : maxOriginalPrice;
            item.original_price < minOriginalPrice ? minOriginalPrice = item.original_price : minOriginalPrice;
            sumStock += item.stock;
        });
        return {
            sumStock,
            priceRange: minPrice == maxPrice ? minPrice : minPrice + '-' + maxPrice,
            originalPriceRange: minOriginalPrice == maxOriginalPrice ? minOriginalPrice : minOriginalPrice + '-' + maxOriginalPrice
        };
    }
    async minPrice(arr) {
        let minPrice = arr[0].price;
        let minOriginalPrice = arr[0].original_price;
        arr.forEach(item => {
            item.price < minPrice ? minPrice = item.price : minPrice;
            item.original_price < minOriginalPrice ? minOriginalPrice = item.original_price : minOriginalPrice;
        });
        return {
            minPrice,
            minOriginalPrice
        };
    }
    getLocalTime(nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    }
}

module.exports = ToolsService;