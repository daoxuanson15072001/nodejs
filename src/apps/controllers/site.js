const CategoryModel = require("../models/categories");
const ProductModel = require("../models/product");
const CommentModel = require("../models/comment");
const paginate = require("../../common/paginate");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const slug = require("slug");
const ejs = require("ejs");
const config = require("config");
const transporter = require("../../common/transporter");
const home = async (req,res) => {
    const LatestProducts = await ProductModel.find({
        is_stock : true 
    }).sort({_id:1}).limit(6); // sort theo id --- 1 là tăng dần -1 là giảm dần
    const FeaturedProducts = await ProductModel.find({
        is_stock : true , 
        featured : true ,
    }).limit(6);
    res.render("site/index" , {
        FeaturedProducts : FeaturedProducts,
        LatestProducts : LatestProducts,
    });
    
}
const cart = async (req,res) => {
    const products = req.session.cart;
    res.render("site/cart" , {products,totalPrice:0});
}

const updateCart = (req, res) => {
    const products = req.body.products;
    const items = req.session.cart;
    items.map((item) => {
        if (products[item.id]) {
            item.qty = parseInt(products[item.id]["qty"]);
        }
        
    });
    req.session.cart = items;
    res.redirect("/cart");
    }
    
    
const product = async (req,res) => {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    const comments = await CommentModel.find({prd_id:id});
    
    res.render("site/product",{product,comments});
}
const comment = async (req,res) => {
    const id = req.params.id;
    
   const comment = {
       prd_id :id,
       full_name: req.body.full_name,
        email: req.body.email,
        body: req.body.body,
   }
   await CommentModel(comment).save();
   res.redirect(req.path);

}
const category = async (req,res) => {
    const slug = req.params.slug;
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1 ;// cau lenh if
    const limit = 10;
    // lấy ra document bị bỏ
    const skip = page*limit -limit;
    const total = await ProductModel.find({cat_id:id}).countDocuments();
    const products = await ProductModel.find({cat_id:id}).sort({id:-1}).skip(skip).limit(limit);
    const totalPage = Math.ceil(total/limit);
    const category = CategoryModel.findById(id);
    const title = category.title;
    res.render("site/category",{
        products:products,
        totalPage:totalPage,
        page:page,
        pages:paginate(page,totalPage),
        title:title,
        category:category,
        total:total,
        
    });
}
const search = async (req,res) => {
    const keyword = req.query.keyword || "";
    const filter = {};
    if(keyword){
        filter.$text = {$search: keyword}
    }
    const products = await ProductModel.find(filter);
    // console.log(products);
    res.render("site/search", {keyword, products});
}
const addToCart = async(req,res) => {
    const body = req.body;
    let  items = req.session.cart;
    let isUpdate = false;
    // mua lai san pham da mua roi
    items.map((item) => {
        if(items.id === body.id) {
            isUpdate = true ;
            item.qty += parseInt(body.qty);
        }
        return item;
    });
    // mua 1 san pham moi
    if(!isUpdate) {
        const product = await ProductModel.findById(body.id);
        items.push({
            id:product.id,
            name : product.name,
            price : product.price,
            img : product.thumbnail,
            qty : parseInt(body.qty)
        })
    }
    req.session.cart = items;
    res.redirect("/cart");
}
const order = async (req, res)=>{
    const items = req.session.cart;
    const body = req.body;
    // Lấy ra đường dẫn đến thư mục views
    const viewPath = req.app.get("views");
    // Compile template EJS sang HTML để gửi mail cho khách hàng
    const html = await ejs.renderFile(
        path.join(viewPath, "site/email-order.ejs"),
        {
            name: body.name,
            phone: body.phone,
            mail: body.mail,
            add: body.add,
            // url: config.get("app.url"),
            totalPrice: 0,
            items,
        }
    );
    // Gửi mail
    await transporter.sendMail({
        to: body.mail,
        from: "Vietpro Shop",
        subject: "Xác nhận đơn hàng từ Vietpro Shop",
        html,
    });

    req.session.cart = [];
    res.redirect("/success");
}
const success = (req,res) => {
    res.render("site/success");
}
const delCart = (req, res)=>{
    const id = req.params.id;
    const items = req.session.cart;
    items.map((item, key)=>{
        if(item.id === id){
            items.splice(key, 1);
        }
        return item;
    });
    req.session.cart = items;
    res.redirect("/cart");
}
module.exports = {
    home : home ,
    cart : cart , 
    category : category,
    search : search,
    success : success,
    product : product,
    comment:comment,
    addToCart:addToCart,
    updateCart:updateCart,
    order:order,
    delCart:delCart,
}