import express from "express";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const router = express.Router();

//Rutas

//1. Crear una ruta que reciba el nombre y precio de un nuevo deporte, lo persista en un archivo JSON.
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

router.get("/agregar", (req, res) => {
  try {
    const { nombre, precio } = req.query;
    const deporte = {
      nombre,
      precio,
    };
    const { deportes } = JSON.parse(
      fs.readFileSync("assets/json/deportes.json")
    );
    console.log(deportes);
    deportes.push(deporte);
    fs.writeFileSync("assets/json/deportes.json", JSON.stringify({ deportes }));
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

//2. Crear una ruta que al consultarse devuelva en formato JSON todos los deportes registrados
router.get("/deportes", (req, res) => {
  const deportes = JSON.parse(fs.readFileSync("assets/json/deportes.json"));
  res.json(deportes);
});

//3. Crear una ruta que edite el precio de un deporte registrado utilizando los parámetros de la consulta y persista este cambio
router.get("/editar", (req, res) => {
  const { nombre, precio } = req.query;
  const deporte = {
    nombre,
    precio,
  };
  const { deportes } = JSON.parse(fs.readFileSync("assets/json/deportes.json"));
  const index = deportes.findIndex((d) => d.nombre === nombre);
  deportes[index] = deporte;
  fs.writeFileSync("assets/json/deportes.json", JSON.stringify({ deportes }));
  res.redirect("/");
});

//4. Crear una ruta que elimine un deporte solicitado desde el cliente y persista este cambio
router.get("/eliminar", (req, res) => {
  const { nombre } = req.query;
  const { deportes } = JSON.parse(fs.readFileSync("assets/json/deportes.json"));
  const index = deportes.findIndex((d) => d.nombre === nombre);
  deportes.splice(index, 1);
  fs.writeFileSync("assets/json/deportes.json", JSON.stringify({ deportes }));
  res.redirect("/");
});

export default router;
