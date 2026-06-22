const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let servidores = require("./servidores.json");

app.get("/", (req, res) => {
    res.send("⛏️ MC-Servershost V2 API activa");
});

app.get("/servidores", (req, res) => {
    res.json(servidores);
});

app.post("/crear", (req, res) => {

    const nuevoServidor = {
        id: Date.now(),
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        version: req.body.version,
        estado: "apagado"
    };

    servidores.push(nuevoServidor);

    res.json({
        mensaje: "Servidor creado",
        servidor: nuevoServidor
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("MC-Servershost V2 activo :" + PORT);
});
