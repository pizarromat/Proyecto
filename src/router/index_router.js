import { Router } from "express";
import api_router from './api/index.js'
//import view_router from './views/index.js'

const index_router = Router()

//todas las rutas de la api rest van a tener el endpoint /api
index_router.use('/api',api_router)

//mientras que todas las rutas de la vista, van a tener el endpoint / (libre)
//index_router.use('/',view_router)



export default index_router

//enrutador principal de la aplicacion
//aca llamo solamente al enrutador de la API
//y al enrutador de las vistas