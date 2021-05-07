const UserModel = require("../models/user");
const CategoryModel = require("../models/categories");
const ProductModel = require("../models/product");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const title = "trang chur quanr tri";
const test = (req, res) => {
   console.log(title);
}
const frmupload = (req ,res) => {
    res.send(`
        <form method= "post" enctype="multipart/form-data">
            <input type = "file" name="file_upload"/>
            <button type="submit">upload</button>
        </form>
    `);
}
const file_upload = (req ,res) => {
    const file =req.file;
    fs.renameSync(file.path , path.resolve("src/public/images/products" , file.originalname)); // di chuyen tu noi no sang noi kia
    console.log(file.preservePath);
}
module.exports= {
    test: test,
    frmupload:frmupload,
    file_upload:file_upload,
}