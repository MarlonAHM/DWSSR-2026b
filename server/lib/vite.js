//blicclioteca file stream
import fs from 'node:fs'
//biblioteca de rutas
import path from  'node:path'
import { fileURLToPath } from 'url';
//creando variables de rutas 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  
/**
 * Helper para handlebars que genera las etiquetas de vite 
 * EN DESAROLLO: conecta al servidor de desarrollo de vite 
 * EN PRODUCCIÓN: usa los compilados vite 
 */
export function viteAssets() {
    //obtener modo de ejecucion
    const isDev = process.env.NODE_ENV !== 'production';
    // Rescatando la URL del servdior de desarollo
    const viteDevServer = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173';

    //si estamos en modo de desarrollo
    if(isDev){
        //En desarrollo cargamos los archivos
        //del front end directamnete del servidor 
        // de Desarrollo de Vite
        return `
        <script type="module" src="${viteDevServer}/@vite/client"></script>
        <script type="module" src="${viteDevServer}/main.js"></script>
        `
    }

    //En produccion leeemos el manifest 
    // y generamos las etiquetas fiales de produccion 
    const manifestPath = path.join(__dirname, '..', '..', 'dist', 'vite', 'manifest.json');
   
    //si no exitiste el manifest
    if(!fs.existsSync(manifestPath)){
        console.warn("Vite manifest not found. Run 'npm run build'");
        return ''
    }
}