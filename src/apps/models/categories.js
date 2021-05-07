const mongoose = require("../../common/database")();
const categorySchema = new mongoose.Schema({
    title:{
        type : String,
        require: true, // phai nhap gia tri
    },
    slug: {
        type : String,
        require: true,
    },
    description: {
        type : String,
        default : null,
    },
} , {
    timestamps: true,
});
const CategoryModel = mongoose.model("Category" , categorySchema , "categories");
module.exports = CategoryModel;