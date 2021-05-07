const app = require("../apps/app");
const config = require("config");
app.listen(port= config.get("app").port , (req,res) => {
    console.log("server on running on port" + port);
});