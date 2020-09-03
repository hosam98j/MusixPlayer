import express from "express";
import { readdir } from "fs";
const PORT = 2020;

const app = express();
app.use(express.static("public"));
app.use(express.json());

app.get("/music", (req, res) => {
  readdir("./public/music", (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send({ songs: data });
  });
});

app.listen(PORT, () => console.log(`server runing on port ${PORT}`));
