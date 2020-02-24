'use strict';

const BaseController = require('../base');

class ItemController extends BaseController {
    // 添加商品
    async addItem() {
        const { ctx, app: { validator } } = this;
        ctx.validate(validator.item.item.addItem);
        let { categories, carousel, specifications, name, price, details,sku } = ctx.request.body;
        
        const minPrice = await this.service.utils.minPrice(sku);

        let params = {
            categories,
            carousel: carousel,
            min_price: minPrice.minPrice,
            min_original_price: minPrice.minOriginalPrice,
            specifications,
            name,
            price,
            details
        }

        let Item = await new ctx.model.Item(params);
        const data = await Item.save();  //获取商品id
    
        const newSku = sku.map(obj=>{
            let newObj = obj;
            newObj.item_id = data._id;
            newObj.name = data.name;
            return newObj;
        });                                 //批量为每个sku添加商品id
        await ctx.model.Sku.insertMany(newSku);
        this.success("success!");
    }
    // 获取商品详情页
    async getItem() {
        const { ctx, app: { validator } } = this;
        ctx.validate(validator.item.item.getItem, ctx.request.query);
        let { _id } = ctx.request.query;
        //mongoose返回的数据没有isPraise，不能修改，加上lean()就可以修改了
        const itemDetails = await ctx.model.Item.findOne({ _id: _id }).lean();
        // 当前商品所以的sku数组
        const skuArr = await ctx.model.Sku.find({ item_id: _id },{
            original_price: 1,
            skuType: 1,
            stock: 1,
            price: 1,
            cost_price: 1,
            pic: 1,
            difference: 1,
            item_id: 1
        }).lean();
        // 获取所有的sku价格范围和总库存
        const priceAndStock = await this.service.utils.priceAndStock(skuArr);
        /**
         * stock 总库存
         * priceRange 售价范围
         * originalPriceRange 原价范围
         */
        itemDetails.stock = priceAndStock.sumStock;
        itemDetails.priceRange = priceAndStock.priceRange;
        itemDetails.originalPriceRange = priceAndStock.originalPriceRange;
        itemDetails.sku = skuArr;

        this.success(itemDetails);
        // let tree = [];
        // let specification = [];   //规格id数组
        // skuArr[0].prop_name.forEach((element) => {
        //     specification.push(Object.keys(element)[0])
        // })
        // const specificationName = await ctx.model.Specification.find({ _id: { $in: specification } },{
        //     name: 1
        // }).lean();                  //规格name数组

        // // console.log(specificationName);
        // specificationName.forEach((element,index)=>{
        //     element.v_id=[];
        //     element.k = element.name;
        //     element.k_id = element._id;
        //     element.k_s = 's'+(index+1);
        // })

        // // 单个sku信息整合
        // skuArr.forEach((element,index) => {
        //     element.discount = 0;
        //     element.stock_num = element.stock;
        //     element.goods_id = element.item_id;
        //     element.prop_name.forEach((element2,index2) => {
        //         let key = Object.keys(element2)[0];
        //         element['s' + (index2 + 1)] = element2[key];
        //         // 把规格下面的属性统一放在规格下面
        //         specificationName[index2].v_id.push(element2[key]);
        //     });
        // });
        // // 把属性名字和id放在v里面
        // for (let index = 0; index < specificationName.length; index++) {
        //     const element = specificationName[index];
        //     element.v = await ctx.model.Attributes.find({ _id: { $in: element.v_id } }, {
        //         name: 1
        //     }).lean();
        // }
        // // 给自己_id改成id
        // specificationName.forEach(element=>{
        //     element.v.forEach(element2 => {
        //         element2.id = element2._id;
        //     });
        // })
        // itemDetails.sku = {
        //     tree: specificationName,
        //     list: skuArr,
        //     price: itemDetails.priceRange,
        //     stock_num: itemDetails.stock, // 商品总库存
        //     none_sku: false,  // 是否无规格商品 
        //     hide_stock: false  // 是否隐藏剩余库存
        // };
        // this.success(itemDetails); 
    }
    // 获取商品列表
    async getItemList() {
        const { ctx,app, app: { validator } } = this;
        try {
            ctx.validate(validator.item.item.getItemList, ctx.request.query);
            const { categories, page, sort, pageSize} = ctx.request.query;
            let sortObj;
            switch (sort) {
                case 'comprehensive':
                    sortObj = {
                        add_time: 1
                    };
                    break;
                case 'sale':
                    sortObj = {
                        sales_volume: -1
                    };
                    break;
                case 'price_asc':
                    sortObj = {
                        min_price: 1
                    };
                    break;
                case 'price_des':
                    sortObj = {
                        min_price: -1
                    };
                    break;
                default :
                    sortObj = {
                        add_time: 1
                    };
            }

            const itemData = await ctx.model.Item.paginate({
                categories
            }, { 
                select:{
                    min_price: 1,
                    min_original_price: 1,
                    name: 1,
                    carousel: 1,
                    sales_volume: 1
                },
                sort: sortObj,
                page: Number(page),
                limit: Number(pageSize)
            });
            this.success(itemData); 
        } catch (error) {
            this.error(err)
        }
    }
}

module.exports = ItemController;
