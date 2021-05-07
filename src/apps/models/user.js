// gọi file kết nối tới mongodb
const mongoose = require("../../common/database")(); // lay ra mongoose
// su dung schema de mo ta collection user
const userSchema = mongoose.Schema({
    full_name: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        unique: true,
    },
    password:{
        type: String,
        default: null,
    },
    role: {
        type : String,
        enum: ["member" , "admin"],
        default:"member",
    },
});
// biến lop userSchema thành model
const UserModel = mongoose.model("users" , userSchema , "users"); // tham số thứ nhất là biệt danh của users
module.exports = UserModel;