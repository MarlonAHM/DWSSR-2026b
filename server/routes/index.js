import express from 'express'
const router = express.Router();

let counter = 0;
let numbers = []; // Declaramos el arreglo aquí

/* GET home page. */
// eslint-disable-next-line
router.get('/', function(req, res, next) {
  counter++;
  numbers.push(counter);
  res.render('index', { 
    title: 'Marlon Herrera',
    counter,
    numbers
  });
});

export default router;