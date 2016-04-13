import * as express from "express";
import * as path from "path";
import * as hbs from "express-handlebars";

const app = express();

const prod = process.env.NODE_ENV === "production";
const dev = process.env.NODE_ENV === "development";

console.log(`starting in "${process.env.NODE_ENV}" mode`);

app.engine(".hbs", hbs({
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "../../html/layouts/"),
    defaultLayout: "main"
}));

app.set("view engine", ".hbs");
app.set('views', path.join(__dirname, '../../html'));

if (dev) {
    app.use(require("connect-livereload")({
        port: 35729
    }));

    const livereload = require('livereload');
    const livereloadServer = livereload.createServer();
    livereloadServer.watch([
        path.join(__dirname, "../../css"),
        path.join(__dirname, "../../dist/bundle/bundle.js"),
    ]);
}

app.use("/css", express.static(path.join(__dirname, "../../css")));
app.use("/dist", express.static(path.join(__dirname, "../../dist")));

app.get("/", function (req, res) {
    res.render("index");
});

app.listen(process.env.PORT || 8080);
