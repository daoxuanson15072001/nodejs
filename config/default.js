module.exports = {
    app: {
        port: 3000,
        views_folder: __dirname + "/../src/apps/views",
        view_engine: "ejs",
        static_folder: __dirname+ "/../src/public",
        session_Key:"vietpro" ,
        session_Secure: false ,
    },
}