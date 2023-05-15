
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
            return 201
        } else {
            this.products = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 200
        }
    }

    async addProduct({ title,description,price,thumbnail,code,stock }) {
        try {
            if (title&&description&&price&&thumbnail&&code&&stock) {
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
                console.log('id´s created product: '+data.id)
                return 201
            }
            console.log('complete data')
            return null
        } catch(error) {
            console.log(error)
            return null
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
            return 200
        } catch(error) {
            console.log(error)
            return null
        }
    }

    async deleteProduct(id) {
        try {
            let one = this.products.find(each=>each.id===id)
            if (one) {
                this.products = this.products.filter(each=>each.id!==id)
                let data_json = JSON.stringify(this.products,null,2)
                await fs.promises.writeFile(this.path,data_json)
                console.log('delete product: '+id)
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

let manager = new ProductManager('./src/data/data.json')

export default manager