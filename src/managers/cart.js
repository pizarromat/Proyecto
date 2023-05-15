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
            return 201
        } else {
            this.carts = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 200
        }
    }

    async addCart() {
        try {
            let data = { products: [] }
            if (this.carts.length>0) {
                let next_id = this.carts[this.carts.length-1].id+1
                data.id = next_id
            } else {
                data.id = 1
            }
            this.carts.push(data)
            let data_json = JSON.stringify(this.carts,null,2)
            await fs.promises.writeFile(this.path,data_json)
            console.log('id´s created cart: '+data.id)
            return 201
        } catch(error) {
            console.log(error)
            return null
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
        let one = this.cart.find(each=>each.id===id)
        if(!one) {
            console.log('getCartById: error')
            return null
        } else{
            console.log('finded Cart: '+id)
            return 200
        }
    }

    async updateCart(id,data) {
        try {
            let one = this.read_cart(id)
            for (let prop in data) {
                one[prop] = data[prop]
            }
            let data_json = JSON.stringify(this.carts,null,2)
            await fs.promises.writeFile(this.path,data_json)
            console.log('updated cart: '+id)
            return 200
        } catch(error) {
            console.log(error)
            return null
        }
    }

    async deleteCart(id) {
        try {
            let one = this.carts.find(each=>each.id===id)
            if (one) {
                this.carts = this.carts.filter(each=>each.id!==id)
                let data_json = JSON.stringify(this.carts,null,2)
                await fs.promises.writeFile(this.path,data_json)
                console.log('delete cart: '+id)
                return 200
            }
            console.log('not found')
            return null
        } catch(error) {
            console.log(error)
            return null
        }
    }
}

let cartManager = new CartManager('./src/data/cart.json')

export default cartManager
