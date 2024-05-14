import {IAppData, ICart, IOrder, IProduct} from '../../types/index'
import {IEvents} from "../base/events"

export class AppData implements IAppData {
  catalog: IProduct[] = [];
  order: IOrder;
  selectedProduct: IProduct | null;
  events: IEvents;

  constructor (events: IEvents) {
    this.events = events;
    this.order = this.setBaseOrder()
  }

  setCatalog(products: IProduct[]): void {
    this.catalog = products;
    this.events.emit('store:init', this.catalog)
  }

  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
    this.events.emit('product:open', this.selectedProduct)
  }

  setBaseOrder():IOrder {
    return {
     totalPrice: null,
     products: [],
     method: null,
     address: null,
     email: '',
     phone: ''
    }
  }
  addToCart(product: IProduct):void {
    this.order.products.push(product);
  }
  removeFromCart(product: IProduct): void {
    this.order.products = this.order.products.filter((item) => item.id !== product.id)
  }

  checkItemInCart(product: IProduct) {
    return this.order.products.find((item) => item.id === product.id) ? true:false
  }
  getTotalPrice() {
    return this.order.products.reduce((a,b) => a + b.price, 0)
  }
}
