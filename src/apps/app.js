const express = require("express");
const app = express();
const config = require("config");
const session = require("express-session");
app.set("views", config.get("app").views_folder);
app.set("view engine" , config.get("app").view_engine);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// config session
app.set('trust proxy', 1) // trust first proxy

app.use(session({
  secret: config.get("app").session_Key,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: config.get("app").session_Secure},
}));

// sử dụng router
app.use(require("../routers/web"));
// định nghĩa đường dẫn 
app.use("/static" , express.static(config.get("app").static_folder));
module.exports = app;