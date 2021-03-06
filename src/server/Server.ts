import * as express from "express";
import * as path from "path";
import * as expressLayouts from "express-ejs-layouts";

const app = express();

const prod = process.env.NODE_ENV === "production";
const dev = process.env.NODE_ENV === "development";

app.locals.production = prod;

console.log(`starting in "${process.env.NODE_ENV}" mode`);

app.set("view engine", ".ejs");
app.set("views", path.join(__dirname, "../../html"));
app.set("layout", "layouts/main");

app.use(expressLayouts);

app.get("/.well-known/acme-challenge/-iVd3peEcp9aAZ1QpFOrwlcL2XLv8QhSnSy4VQMYNZg", (req:express.Request, res:express.Response) => {
    res.send("-iVd3peEcp9aAZ1QpFOrwlcL2XLv8QhSnSy4VQMYNZg.Z1bYZnBt1AQp0QnCDgDyYZsOg4kZCHj49TYfJ6ydl2g");
});

if (dev) {
    app.use(require("connect-livereload")({
        port: 35729,
    }));

    const livereload = require("livereload");
    const livereloadServer = livereload.createServer();
    livereloadServer.watch([
        path.join(__dirname, "../../css"),
        path.join(__dirname, "../../dist/bundle/bundle.js"),
    ]);
}

app.use("/css", express.static(path.join(__dirname, "../../css")));
app.use("/js", express.static(path.join(__dirname, "../../dist/bundle")));

app.get("/", function (req, res) {
    res.render("index");
});

app.listen(process.env.PORT || 8080);
