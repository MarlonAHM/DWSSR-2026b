import createError from 'http-errors';
//import express from 'express';
// Importar el framework express
import express from 'express';

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
// Imports para crear Dirname
import { fileURLToPath } from 'node:url';

import path, { dirname } from 'node:path';

import indexRouter from '#routes/index.js';
import usersRouter from '#routes/users.js';
// Importando la funcion de configuracion de Hbs
import configureHandlebars from './lib/handlebars.js';
// Importando la configuracion de winston logger
import logger from './lib/winston.js';

// __dirname no existe por defecto en ES modules, hay que recrearlo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear la aplicacion express
logger.info('🔨 Creando backend');
const app = express();

// Configurar el motor de vistas con hbs
configureHandlebars(app);

// Configurar middlewares de la aplicacion
app.use(
  morgan('dev', {
    stream: {
      write: (msg) => logger.info(msg.trim()),
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//archivs estaticos para produccion
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
}

// Registramos las rutas de la aplicacion
logger.info('🔨 Creando servidor de Archivos Estáticos');
app.use(express.static(path.join(__dirname, 'public')));
// debug('🛣️ Registrando rutas');
logger.info('🛣️ Registrando rutas');
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  next(createError(404));
});

//Manejador de errores

app.use((err, req, res, _next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
export default app;
