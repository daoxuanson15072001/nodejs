const express = require("express");
const router = express.Router();
// gọi controller
const authController = require("../apps/controllers/auth");
const adminController = require("../apps/controllers/admin");
const productController = require("../apps/controllers/product");
const testController = require("../apps/controllers/test");
const userController = require("../apps/controllers/user");
const categoryController = require("../apps/controllers/categories");
const siteController = require("../apps/controllers/site");
const chatController = require("../apps/controllers/chat");
    //goị middelware
const authMiddlewares = require("../apps/middlewares/auth");
const uploadMiddlewares = require("../apps/middlewares/upload");
const { SchemaTypeOptions } = require("mongoose");
router.get("/test" , testController.test);
router.get("/upload" , testController.frmupload);
router.post("/upload" ,uploadMiddlewares.single("file_upload"), testController.file_upload);
/*router.get("/form" , (req,res) => {     
   res.send(`
        <form method = post>
            <input type = "text"  name = "mail" />
            <input type = "text"  name = "pass" />
            <input type = "submit"  name = "sub"  value = "login" />
        </form>
   `)
});
lấy dữ liệu trong form bằng urlencode
router.post("/form" , (req,res) => {
    const mail = req.body.mail;
    const pass = req.body.pass;
    console.log(mail + "-" + pass);
});
*/

router.get("/admin/login",authMiddlewares.checkLogin, authController.login);
router.post("/admin/login",authMiddlewares.checkLogin, authController.postLogin);

router.get("/admin/logout",authMiddlewares.checkAdmin, adminController.logout);

router.get("/admin" ,authMiddlewares.checkAdmin, adminController.index);
router.get("/admin/users" ,authMiddlewares.checkAdmin, userController.index);
router.get("/admin/users/create" ,authMiddlewares.checkAdmin, userController.create);
router.post("/admin/users/create" ,authMiddlewares.checkAdmin, userController.add_user);

router.get("/admin/users/edit/:id" ,authMiddlewares.checkAdmin, userController.edit);
router.get("/admin/users/delete/:id" ,authMiddlewares.checkAdmin, (req,res)=> {
    res.send("admin");
});
router.get("/admin/categories" ,authMiddlewares.checkAdmin, categoryController.category);
router.get("/admin/categories/create" ,authMiddlewares.checkAdmin, categoryController.create);
router.get("/admin/categories/edit/:id" ,authMiddlewares.checkAdmin, categoryController.edit);

router.get("/admin/categories/delete/:id" ,authMiddlewares.checkAdmin, (req,res)=> {
    res.send("admin");
});

/////
router.get("/admin/products",authMiddlewares.checkAdmin, productController.index);
router.get("/admin/products/create",authMiddlewares.checkAdmin, productController.create);

router.post("/admin/products/create",uploadMiddlewares.single("prd_image"), productController.add_product);

router.get("/admin/products/edit/:id", productController.edit);
router.post("/admin/products/update/:id",uploadMiddlewares.single("thumbnail"), productController.update);
router.get("/admin/products/delete/:id", productController.del);

router.get("/" , siteController.home);
router.get("/cart" , siteController.cart);
router.post("/update-cart" , siteController.updateCart);
router.post("/addToCart" , siteController.addToCart);
router.get("/del-cart-:id", siteController.delCart);
router.get("/category" , siteController.category);
router.get("/product-:slug.:id" , siteController.product);
router.post("/product-:slug.:id" , siteController.comment); 
 router.post("/order", siteController.order);
router.get("/success" , siteController.success);
router.get("/search" , siteController.search);
router.get("/category-:slug.:id" ,siteController.category);

router.get("/chat",authMiddlewares.checkUser , chatController.chat);
module.exports = router;


