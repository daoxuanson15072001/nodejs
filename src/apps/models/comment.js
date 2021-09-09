const mongoose = require("../../common/database")();
const commentSchema = new mongoose.Schema({
    prd_id :{
        type: mongoose.Types.ObjectId,
        ref: "Product", // ref sang bí danh là tham số thứ nhất file prodct.js
        require: true,
    },
    email :{
        type : String,
        default : null,
    },
    body: {
        type : String,
        default : null,
    },
    full_name: {
        type : String,
        default : null,
    }
},
    {
        timestamps : true,
    }
);
const CommentModel = mongoose.model("Comment" , commentSchema ,"comments");
module.exports = CommentModel;