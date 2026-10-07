import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createDebug from 'debug';
import { fileURLToPath } from 'node:url';
import {dirname} from 'node:path'
//importando el template engine handlebars
import hbs from 'hbs'

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
//importando el registrador de helper 
import { registerViteHelper } from './lib/vite.js';

// __dirname no existe por defecto en ES modules, hay que recrearlo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const debug = createDebug('dwssr-2026b:server');

const app = express();
debug('✨ Creando backend');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//registro helper
registerViteHelper(hbs);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//archivs estaticos para produccion
if(process.env.NODE_ENV == 'production'){
  app.use(express.static(path.join(__dirname, 'dist')));
}

debug('📁 Creando servidor de Archivos Estáticos');
app.use(express.static(path.join(__dirname, 'public')));

debug('🔀 Registrando rutas');
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

export default app;