import { ShoppingCart } from './shopping-cart';


export class Order{
    datePlaced : number;
    items : any [];
    constructor(public userId : string, public Shipping : any, shoppingCart : ShoppingCart){
        this.datePlaced =new Date().getTime();
        this.items=shoppingCart.items.map((i:any)=>{
            return {
              product : {
                title : i.title,
                imageURL : i.imageURL,
                price : i.price
              },
              quantity : i.quantity,
              totalPrice : i.totalPrice  }
         })


    }

}