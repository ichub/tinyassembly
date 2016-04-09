import * as express from "express";
import * as path from "path";

const app = express();

app.use("/css", express.static(path.join(__dirname, "../../css")));
app.use("/dist", express.static(path.join(__dirname, "../../dist")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../index.html"));
});

app.listen(process.env.PORT || 8080)