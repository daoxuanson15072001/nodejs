const UserModel = require("../models/user");
const ProductModel = require("../models/product");
const product = require("./product");
const logout = (req,res) => {
    req.session.destroy();
    res.redirect("/admin/login");
   
};
const index = async(req , res)=> {
    const users = await UserModel.find();
    const totalUsers = users.length;
    const products = await ProductModel.find();
    const totalProducts = await products.length;
    res.render("admin/dashboard" , {totalUsers:totalUsers , totalProducts:totalProducts});
}
module.exports = {
    index:index,
    logout: logout,
}