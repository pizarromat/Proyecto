/* const fs = require('fs') */
import fs from 'fs'

class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
        this.init(path)
    }

    init(path) {
        let file = fs.existsSync(path)
        if (!file) {
            fs.writeFileSync(path,'[]')
            console.log('file created at path: '+this.path)
            return 'file created at path: '+this.path
        } else {
            this.products = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 'data recovered'
        }
    }

    async addProduct({ title,description,price,thumbnail,code,stock }) {
        try {
            let data = { title,description,price,thumbnail,code,stock }
            if (this.products.length>0) {
                let next_id = this.products[this.products.length-1].id+1
                data.id = next_id
            } else {
                data.id = 1
            }
            this.products.push(data)
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            console.log('created product: '+data.id)
            return 'product: '+data.id
        } catch(error) {
            console.log(error)
            return 'addProduct: error'
        }
    }

    getProducts() {
        try{
            return this.products
        } catch(error) {
            console.log(error)
            return 'getProduct: error'
        }
    }

    getProductById(id) {
        let one = this.products.find(each=>each.id===id)
        if(!one) {
            console.log('getProductById: error')
            return null
        } else{
            console.log('finded product: '+id)
            return one
        }
    }

    async updateProduct(id,data) {
        try {
            let one = this.getProductById(id)
            if(!one) {
                console.log('Not found')
                return 'Not found'
            }
            if(Object.keys(data).length===0) {
                console.log('error: insert some product')
                return 'error: insert some product'
            }
            for (let prop in data) {
                one[prop] = data[prop]
            }
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            console.log('updatedProduct: '+id)
            return 'updatedProduct: '+id
        } catch(error) {
            console.log(error)
            return 'updateProduct: error'
        }
    }

    async deleteProduct(id) {
        try {
            let one = this.getProductById(id)  
            if(!one) {
                console.log('Not found')
                return 'Not found'
            }
            this.products = this.products.filter(each=>each.id!==id)
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            console.log('deleteProduct: '+id)
            return 'deleteProduct: '+id
        } catch(error) {
            console.log(error)
            return 'deleteProduct: error'
        }
    }

}

let manager = new ProductManager('./data/data.json')

async function manage() {    
    await manager.addProduct({ title:"remeras",description:"remeras de colores",price:10,thumbnail:"foto remera",code:"rem",stock:4 })
    await manager.addProduct({ title:"gorras",description:"gorras de colores",price:5,thumbnail:"foto gorras",code:"gor",stock:10 })
    await manager.addProduct({ title:"buzos",description:"buzos de colores",price:20,thumbnail:"foto buzos",code:"buz",stock:8 })
    await manager.addProduct({ title:"pantalones",description:"pantalones de colores",price:15,thumbnail:"foto pantalones",code:"pan",stock:6 })
    await manager.addProduct({ title:"zapatillas",description:"zapatillas de colores",price:30,thumbnail:"foto zapatillas",code:"zap",stock:2 })
    await manager.addProduct({ title:"short",description:"short de colores",price:10,thumbnail:"foto short",code:"zap",stock:12 })
    await manager.addProduct({ title:"camperas",description:"camperas de colores",price:25,thumbnail:"foto camperas",code:"camp",stock:5 })
    await manager.addProduct({ title:"jean",description:"jean de colores",price:30,thumbnail:"foto jean",code:"jean",stock:15 })
    await manager.addProduct({ title:"camisas",description:"camisas de colores",price:25,thumbnail:"foto camisas",code:"cami",stock:10 })
    await manager.updateProduct(1,{ title:"short" })
    await manager.updateProduct(2,{ title:"campera", stock:15 })
    await manager.updateProduct(3,{})  
    await manager.deleteProduct(1)
    await manager.deleteProduct(130)
}
//manage()

export default manager