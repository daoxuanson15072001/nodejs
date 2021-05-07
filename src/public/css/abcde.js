const express = require("express");
const app = express();
const router = express.Router();
/*router.get("/search" , (req, res) => {
    res.send(`
        <form method = "post">
            <input type= "text" name ="txt"/>
            <input type= "submit" name ="sbm" value="search"/>
        </form>
    `);
});
router.post("/search" , (req , res) => {
    res.send("<h2> WELCOME TO JAPAN </h2>");
});
*/  
router.get("/users/:usersID/product/:productID" , (req , res) => {
    console.log(req.params);
    res.send("<h2> WELCOME TO JAPAN </h2>");
});
app.use("/static", express.static(__dirname + "/src/public"));
app.use(router);
app.listen(port =3000, () => {
    console.log("sever running on port" +port);
});