import { Router } from "express";
import products_router from './products.js'
import cart_router from './carts.js'

const api_router = Router()

api_router.use('/products',products_router)
api_router.use('/carts',cart_router)

export default api_router 

//enrutador principal de la API (para enviar datos)

// aca llamo solamente al enrutador de los recursos (product, cart, users)