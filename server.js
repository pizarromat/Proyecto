import express from 'express';
import manager from './products.js'

let server = express()

let PORT = 8080
let ready = () => console.log('server ready on port: '+PORT)

server.listen(PORT,ready)
server.use(express.urlencoded({extended:true}))

let index_route = '/'
let index_function = (req,res) => {
    let quantity = manager.getProducts().length
    console.log(quantity)
    return res.send(`there are ${quantity} products`)
}
server.get(index_route,index_function)

let one_route = '/products/:id'
let one_function = (req,res) => {
    let parametros = req.params
    let id = Number(parametros.id)
    //console.log(id)
    //console.log(typeof id)
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
            product: 'not found'
        })
    }
    
}
server.get(one_route,one_function)

let query_route = '/products'
let query_function = (req,res) => {
    let quantity = req.query.quantity ?? 5
    /* if(req.query.quantity) {
        
    } */
    let products = manager.getProducts().slice(0,quantity)
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
