import express from 'express';

const indexRouter = express.Router();

let counter = 0;
const numbers = []; // Declaramos el arreglo aquí

/* GET home page. */
indexRouter.get('/', (req, res, _next) => {
  counter += 1;
  numbers.push(counter);
  res.render('index', {
    title: 'Marlon Herrera',
    counter,
    numbers,
  });
});

export default indexRouter;
