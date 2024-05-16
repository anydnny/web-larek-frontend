import { IAppData, IOrder, IProduct, IUserInfo } from '../types/index';
import { IEvents } from './base/Events';
import { IPaymentInfo } from '../types/index';

export class AppData implements IAppData {
	catalog: IProduct[] = [];
	order: IOrder;
	selectedProduct: IProduct | null;
	events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
		this.order = this.setBaseOrder();
	}

	setCatalog(products: IProduct[]): void {
		this.catalog = products;
		this.events.emit('store:init', this.catalog);
	}

	setSelectedProduct(product: IProduct): void {
		this.selectedProduct = product;
		this.events.emit('product:open', this.selectedProduct);
	}

	setBaseOrder(): IOrder {
		return {
			totalPrice: null,
			products: [],
			method: null,
			address: null,
			email: '',
			phone: '',
		};
	}
	addToCart(product: IProduct): void {
		this.order.products.push(product);
	}
	removeFromCart(product: IProduct): void {
		this.order.products = this.order.products.filter(
			(item) => item.id !== product.id
		);
	}

	checkItemInCart(product: IProduct): boolean {
		return this.order.products.find((item) => item.id === product.id)
			? true
			: false;
	}
	getTotalPrice(): number {
		return this.order.products.reduce((a, b) => a + b.price, 0);
	}

	setPaymentInfo(data: IPaymentInfo): void {
		this.order.method = data.method;
		this.order.address = data.address;
	}
	setUserInfo(data: IUserInfo): void {
		this.order.phone = data.phone;
		this.order.email = data.email;
	}

	sendOrder(): void {
		this.order.totalPrice = this.order.products.reduce(
			(sum, item) => sum + item.price,
			0
		);
		const completedOrder = {
			payment: this.order.method,
			email: this.order.email,
			phone: this.order.phone,
			address: this.order.address,
			total: this.order.totalPrice,
			items: this.order.products
				.filter((item) => item.price)
				.map((item) => item.id),
		};
		this.events.emit('order:send', completedOrder);
	}
}
