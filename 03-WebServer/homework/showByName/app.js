var fs  = require("fs")
var http  = require("http")

// fs y http son dos módulos de node, los cuales los estoy importando
// Escribí acá tu servidor. Primero voy a crear mi server, con una funcion con req y res
// como sus parámetros.  
// La ip del localhost 3000 es 127.0.0.1
// Se pide mostrar cada una de las imagenes que se encuentran en la carpeta images cuando
// la ruta tenga su mismo nombre. Crea un nuevo servidor que usando el path de url muestre
// la imagen con el mismo nombre. Si no hay ninguna imagen con ese nombre, deberia 
// aparecer un mensaje de error.
// En req.url nos llega la url que se está ingresando. En primer lugar hay que preguntar
// donde estoy parado, si estoy parado por ejemplo en arcoiris_doge debo mostrar la imagen,
// pero antes debo leer lo que está pasando con fs.readFile. Voy a leer el directorio 
// sobre el cual estoy parado, por medio de __dirname/images/... 
// res.end envia la información hacia el cliente   
// Hay que definir el content type 
// Este servidor, lo unico que va a hacer, es manejar las imagenes 
// El readFile hace una lectura asincrona. Tenemos un callback, luego de hacer la
// lectura, se llama una funcion de callback  

http.createServer((req, res) => {
        fs.readFile(`${__dirname}/images/${req.url}.jpg`, (err, data) => {
            if(err){
            res.writeHead(404, {'Content-type': 'text/plain'})
            res.end('Hubo un error, este perri no existe');
        } else {
            res.writeHead(200, {'Content-type': 'image/jpg'});
            res.end(data)}
            }
)}).listen(3001, '127.0.0.1');