const express = require('express');
const app = express(); /*Se arma la instancia del servidor con express*/
/*Si quisiera levantar el servidor, tendria que hacerlo en un módulo diferente, 
no en este archivo, en la que requerimos el app o servidor, y ahi hacemos el app.listen*/


app.use(express.json()); /*(sirve para poder leer la información que llegue por body)*/


app.get('/', (req, res) => {
  res.status(200).send({        /*agrego el .status(200) para que quede completo, si no coloco nada, por default me indica que es 200*/
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.status(200).send({
    message: 'test',
  })
});

app.post('/sum', (req, res) => {
  res.status(200).send({
    result: req.body.a + req.body.b
  });
})

app.post('/product', (req, res) => {
  res.status(200).send({
    result: req.body.a * req.body.b
  });
});

app.post('/sumArray', (req, res) => {
  const { array, num } = req.body
    if(!array || !num) return res.sendStatus(400);
    else if(!Array.isArray(array) || typeof num !== 'number') return res.sendStatus(400);                                             /*El método Array.isArray() determina si el valor pasado es un Array*/
    else return res.sendStatus(200);
  })



module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
