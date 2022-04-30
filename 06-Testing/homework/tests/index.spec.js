const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app); /*para hacer las peticiones*/

describe('Test de APIS', () => {

  /*agent seria la petición, en este caso se pide que el get / responda con un 200,
  por default, en index.js, cuando hago el app.get, lo toma como un 200 */
  /*Tener cuidado en este caso, en el segundo test unitario, al hacer peticiones, no 
  se escriben llaves despues de la arrow function, la idea es que se retorne el agent, 
  o sea se retorna directamente la petición al servidor, */

  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));                         /*test unitario*/
    it('responds with and object with a property `message` and value `hola`', () =>    /*test unitario*/
        agent.get('/').then((res) => {                                                 /*se hace la peticion y se captura la respuesta*/
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with a property `message` and value `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test'); /*En este caso, modificamos el 'hola' por 'test' para que tenga sentido con lo que hay antes*/
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('receive from body two params `a` and `b`, then responds with an objects with property `result` and value the sum of `a` and `b`', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /product', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('receive from body two params `a` and `b`, the responds with an object with property `result` and value the product of `a` and `b`', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.post('/sumArray').send({ array: [1], num: 1 }).expect(200));
    
    it('responds with 400, if parameters are not correctly sent', () => agent.post('/sumArray').expect(400));

    it('responds with 400, if given parameter `array` is not an array or the given parameter `num` is not a number', () => agent.post('/sumArray').send({ array: 'string', num: 'string'}).expect(400));
    /*it('It should return true if the sum of two numbers belonging to the array is equal to `num`', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
         expect(res.body.result).toEqual(true);
      }));
    it('It should return false if the sum of two numbers belonging to the array is not equal to `num`', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 99})
        .then((res) => {
          expect(res.body.result).toEqual(false);
      }));*/
  });

});
