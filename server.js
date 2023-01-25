const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(cors());

//RUTAS

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/views/index.html");
});
app.get("/index.html", (req, res) => {
    res.sendFile(__dirname + "/public/views/index.html");
});
app.get("/carrito.html", (req, res) => {
    res.sendFile(__dirname + "/public/views/carrito.html");
});


app.get("/api/productos", (req, res) => {
    //leer el archivo y enviar la data a /api/productos
    fs.readFile(__dirname + "/data.json", "utf8", function (err, data) {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        var jsonData = JSON.parse(data);
        res.status(200).send(jsonData);
      }
    });
});

app.get("/productos", async(req, res) => {
    
    let data= JSON.parse(fs.readFileSync(__dirname + "/data.json",  'utf-8'));
    
    res.render("productos",{data:data});
});

app.get("/productoid/:id", async(req, res) => {
    let idP = req.params.id;
    let id=idP.split("p")[0]
    let data= JSON.parse(fs.readFileSync(__dirname + "/data.json",  'utf-8'));

    let dataProducto=data.find((x)=>{if(x.id==id){return x}})
   
    res.render("producto",{data: dataProducto});
    
});




app.listen(3000);