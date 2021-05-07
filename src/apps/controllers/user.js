const UserModel = require("../models/user");
const paginate = require("../../common/paginate");
const add_user = async (req,res) => {
    const useInsert =  new UserModel({
        email: req.body.user_mail,
        password: req.body.user_pass,
        role: req.body.user_level,
        full_name:req.body.user_full
    }, {versionKey:false });
    useInsert.save();
    console.log("condog");
}
const create = (req,res)=> {
    res.render("admin/user/add_user");
}
const index = async(req,res) => {
    const page = parseInt(req.query.page) || 1 ;// cau lenh if
    const limit = 10;
    // lấy ra document bị bỏ
    const skip = page*limit -limit;
    // lấy ra tổng số bản ghi
    const total = await UserModel.find().countDocuments();
    // lấy ra số trang
    const totalPage = Math.ceil(total/limit);
    // lấy ra document
    const users = await UserModel.find().skip(skip).limit(limit);
    res.render("admin/user/user" , 
    {
        users:users,
        totalPage:totalPage,
        page:page,
        pages:paginate(page,totalPage),
    });
}
const edit = (req,res) => {
    res.render("admin/user/edit_user");
}
module.exports = {
    create: create,
    index: index,
    edit: edit,
    add_user:add_user,
}