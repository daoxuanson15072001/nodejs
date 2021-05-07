const CategoryModel = require("../models/categories");
const ProductModel = require("../models/product");
const paginate = require("../../common/paginate");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const index = async(req,res) => {
    const page = parseInt(req.query.page) || 1 ;// cau lenh if
    const limit = 10;
    // lấy ra document bị bỏ
    const skip = page*limit -limit;
    // lấy ra tổng số bản ghi
    const total = await ProductModel.find().countDocuments();
    // lấy ra số trang
    const totalPage = Math.ceil(total/limit);
    // lấy ra document
    const products = await ProductModel.find().populate({path:"cat_id"}).skip(skip).limit(limit);
    res.render("admin/product/product" , {
        products:products,
        totalPage:totalPage,
        page:page,
        pages:paginate(page,totalPage),
    
    });
}
const create = async(req,res) => {
    const categories = await CategoryModel.find();
    res.render("admin/product/add_product", {categories:categories});
}

const add_product = async(req,res) => {
    const file =req.file;
    fs.renameSync(file.path , path.resolve("src/public/images/products" , file.originalname)); // di chuyen tu noi no sang noi kia
    const productInsert = new ProductModel({
        name : req.body.prd_name,
        price : req.body.prd_price,
        warranty : req.body.prd_warranty,
        accessories : req.body.prd_accessories,
        promotion : req.body.prd_promotion,
        status : req.body.prd_new,
        thumbnail : "products/" + file.originalname,
        cat_id : req.body.cat_id,
        featured : req.body.prd_featured,
        description : req.body.prd_details
    },{versionKey:false});
    productInsert.save();
    console.log("con dog");
}
const edit = (req,res) => {
    res.render("admin/product/edit_product");
}
const del = (req,res) => {
    res.send("delete");
}
module.exports = {
    index: index,
    create: create,
    edit: edit,
    del: del,
    add_product:add_product,
}