const mongoose = require("../../common/database")();
const productSchema = new mongoose.Schema({
    cat_id:{
        type: mongoose.Types.ObjectId,
        ref: "Category",
        require: true,
    },
    name:{
        type : String,
        require: true,
    },
    slug:
    {
        type : String,
        require: true,
    },
    description:{
        type : String,
        default: null,
    },
    thumbnail:{
        type : String,
        default: null,
    },
    price:{
        type : Number,
        default: null,
    },
    status:{ // tinh trang
        type : String,
        default: null,
    },
    featured:{
        type : Boolean,
        default: false,
    },
    promotion:{
        type : String,
        default: null,
    },
    warranty:{ // bao hanh
        type : String,
        default: null,
    },
    accessories:{
        type : String,
        default: null,
    },
    is_stock:{ //con hang hay k
        type : Boolean,
        default: true,
    },

} , {
    timestamps: true,
});
const ProductModel = mongoose.model("Product" , productSchema , "products");
module.exports= ProductModel;