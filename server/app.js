//Funcion para manejar errores 
var createError = require('http-errors');
//Importa el framework express
var express = require('express');
//Importa modulos para manejar rutas 
var path = require('path');
//Importa modulos paa manejar cookies 
var cookieParser = require('cookie-parser');
//Importa modulos para manejar logs 
var logger = require('morgan');

//Importar las rutas de la aplicacion 
var indexRouter = require('./bin/routes/index');
var usersRouter = require('./bin/routes/users');

//Crea la aplicacion express
var app = express();

//Congigurar el motor de vistas 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Configurar middlewares de la aplicacion
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//Configurar la carpeta publica para servir archivos estaticos
app.use(express.static(path.join(__dirname, '..' , 'public')));

//Registrar las rutas de la aplicacion
app.use('/', indexRouter);
app.use('/users', usersRouter);

//Capturar errores 404 y enviarlos al manejador de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
