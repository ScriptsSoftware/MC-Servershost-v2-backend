const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

let servers = [];

if (fs.existsSync("servers.json")) {
    servers = JSON.parse(fs.readFileSync("servers.json"));
}

function save() {
    fs.writeFileSync(
        "servers.json",
        JSON.stringify(servers, null, 2)
    );
}

app.get("/", (req,res)=>{
    res.send("⛏️ MC-Servershost V2 API activa");
});


app.get("/servidores",(req,res)=>{
    res.json(servers);
});


app.post("/crear",(req,res)=>{

    let servidor = {
        id: Date.now(),
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        version: req.body.version,
        estado: "apagado"
    };

    servers.push(servidor);
    save();

    res.json(servidor);
});


app.post("/start/:id",(req,res)=>{

    let s = servers.find(
        x => x.id == req.params.id
    );

    if(s){
        s.estado = "encendido";
        save();
    }

    res.json(s);
});


app.post("/stop/:id",(req,res)=>{

    let s = servers.find(
        x => x.id == req.params.id
    );

    if(s){
        s.estado = "apagado";
        save();
    }

    res.json(s);
});


app.delete("/delete/:id",(req,res)=>{

    servers = servers.filter(
        x => x.id != req.params.id
    );

    save();

    res.json({
        mensaje:"Servidor eliminado"
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(
        "MC-Servershost V2 activo :" + PORT
    );
});
