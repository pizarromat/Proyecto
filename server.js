import express from 'express';
import manager from './products.js'
import manager2 from './cart.js'

let server = express()

let PORT = 8080
let ready = () => console.log('server ready on port: '+PORT)

server.listen(PORT,ready)
server.use(express.urlencoded({extended:true}))


/* ENDPOINTS */

//PRODUCTS 

let index_route = '/'
let index_function = (req,res) => {
    let quantity = manager.getProducts().length
    let quantity2 = manager2.getCarts().length
    console.log(quantity)
    console.log(quantity2)
    return res.send(`there are ${quantity} products, and there are ${quantity2} carts`)
}
server.get(index_route,index_function)

let query_route = '/products'
let query_function = (req,res) => {
    let limit = req.query.limit ?? 5
    let products = manager.getProducts().slice(0,limit)
    if(products.length>0){
        return res.send({
            success: true,
            products
        })
    } else{
        return res.send({
            success: false,
            products: 'not found'
        })
    }
}
server.get(query_route,query_function)

let one_route = '/products/:id'
let one_function = (req,res) => {
    let parametros = req.params
    let id = Number(parametros.id)
    let one = manager.getProductById(id)
    console.log(one)
    if(one){
        return res.send({
            success: true, 
            product: one
        })
    } else {
        return res.send({
            success: false, 
            product: {}
        })
    }
}
server.get(one_route,one_function)


// CARTS

let querys_route = '/carts'
let querys_function = (req,res) => {
    let limit = req.query.limit ?? 7
    let carts = manager2.getCarts().slice(0,limit)
    if(carts.length>0){
        return res.send({
            success: true,
            carts
        })
    } else{
        return res.send({
            success: false,
            carts: 'not found'
        })
    }
}
server.get(querys_route,querys_function)

let two_route = '/carts/:id'
let two_function = (req,res) => {
    let parametros = req.params
    let id = Number(parametros.id)
    let two = manager2.getCartById(id)
    console.log(two)
    if(two){
        return res.send({
            success: true, 
            cart: two
        })
    } else {
        return res.send({
            success: false, 
            cart: {}
        })
    }
}
server.get(two_route,two_function)
