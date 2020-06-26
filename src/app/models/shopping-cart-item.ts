import { Product } from './product';
export class ShoppingCartItem {
    

    constructor(public product: Product, public quantity: number, public productId: string){}
    get totalPrice(){

        return this.product.price * this.quantity
    }
}