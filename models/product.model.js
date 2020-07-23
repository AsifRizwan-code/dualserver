const moongoose = require('mongoose');

const ProductSchema = new moongoose.Schema(
    {
        productName:{type: String, required: true},
        Desc: { type: String, required: true },
        productid: { type: Number, required: true}
    }
)

module.exports=moongoose.model('products',ProductSchema);