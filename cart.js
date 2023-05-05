import fs from 'fs'

class CartManager{
    constructor(path) {
        this.cart = []
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
            this.cart = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 'data recovered'
        }
    }

    async addCart({ title,description,price,thumbnail,code,stock }) {
        try {
            let data = { title,description,price,thumbnail,code,stock }
            if (this.cart.length>0) {
                let next_id = this.cart[this.cart.length-1].id+1
                data.id = next_id
            } else {
                data.id = 1
            }
            this.cart.push(data)
            let data_json = JSON.stringify(this.cart,null,2)
            await fs.promises.writeFile(this.path,data_json)
            console.log('created cart: '+data.id)
            return 'cart: '+data.id
        } catch(error) {
            console.log(error)
            return 'addCart: error'
        }
    }

    getCarts() {
        try{
            return this.cart
        } catch(error) {
            console.log(error)
            return 'getCarts: error'
        }
    }

    getCartById(id) {
        let two = this.cart.find(each=>each.id===id)
        if(!two) {
            console.log('getCartById: error')
            return null
        } else{
            console.log('finded Cart: '+id)
            return two
        }
    }
}
let manager2 = new CartManager('./data/cart.json')

async function manage2() {    
    await manager2.addCart({ title:"remeras",description:"remeras de colores",price:10,thumbnail:"foto remera",code:"rem",stock:4 })
    await manager2.addCart({ title:"gorras",description:"gorras de colores",price:5,thumbnail:"foto gorras",code:"gor",stock:10 })
    await manager2.addCart({ title:"buzos",description:"buzos de colores",price:20,thumbnail:"foto buzos",code:"buz",stock:8 })
    await manager2.addCart({ title:"pantalones",description:"pantalones de colores",price:15,thumbnail:"foto pantalones",code:"pan",stock:6 })
    await manager2.addCart({ title:"zapatillas",description:"zapatillas de colores",price:30,thumbnail:"foto zapatillas",code:"zap",stock:2 })
    await manager2.addCart({ title:"short",description:"short de colores",price:10,thumbnail:"foto short",code:"zap",stock:12 })
    await manager2.addCart({ title:"camperas",description:"camperas de colores",price:25,thumbnail:"foto camperas",code:"camp",stock:5 })
    await manager2.addCart({ title:"jean",description:"jean de colores",price:30,thumbnail:"foto jean",code:"jean",stock:15 })
    await manager2.addCart({ title:"camisas",description:"camisas de colores",price:25,thumbnail:"foto camisas",code:"cami",stock:10 })
}
//manage2()

export default manager2
