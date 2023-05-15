import { Router } from "express";
import api_router from './api/index.js'
//import view_router from './views/index.js'

const index_router = Router()

index_router.use('/api',api_router)

// todas las rutas de la vista, van a tener el endpoint / (libre)
//index_router.use('/',view_router)

export default index_router
