const { Schema, model } = require("mongoose");

const  ProductSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    created_at: String
});

export const Product = model('Product', ProductSchema);