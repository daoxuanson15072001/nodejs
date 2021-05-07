const CategoryModel = require("../models/categories");
const paginate = require("../../common/paginate");
const create = (req,res) => {
    res.render("admin/category/add_category");
}
const category = async (req,res) => {
    const page = parseInt(req.query.page) || 1 ;// cau lenh if
    const limit = 10;
    // lấy ra document bị bỏ
    const skip = page*limit -limit;
    // lấy ra tổng số bản ghi
    const total = await CategoryModel.find().countDocuments();
    // lấy ra số trang
    const totalPage = Math.ceil(total/limit);
    // lấy ra document
    const categories = await CategoryModel.find().skip(skip).limit(limit);
    res.render("admin/category/category", {
        categories:categories,
        totalPage:totalPage,
        page:page,
        pages:paginate(page,totalPage),
    });
}
const edit = (req,res) => {
    res.render("admin/category/edit_category");
}
module.exports = {
    create: create,
    category: category,
    edit: edit,
}