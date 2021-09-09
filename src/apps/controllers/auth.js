const UserModel = require("../models/user");
const login = (req,res) => {
    res.render("admin/index", {data:{}});
};

const postLogin =async (req,res) => {
    const mail = req.body.Username;
    const pass = req.body.Password;
    const {redirect} = req.query;
    let error;
    const users =await UserModel.find({email: mail , password:pass});
    if(users.length >0) {
        req.session.mail = mail;
        req.session.pass = pass;
        req.session._id = users[0]._id;
        res.redirect(redirect?redirect:"/admin");
    }
    else if (mail == "" || pass == "") error = "vui long dien thong tin dang nhap";
    else error = "tai khoan khong hop le";
    res.render("admin/index" , {data:{error:error}});
};
module.exports = {
    login: login,
    postLogin: postLogin,
}