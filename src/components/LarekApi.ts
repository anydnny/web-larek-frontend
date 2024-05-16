import { IShopApi, IProductResponse, ICompleteOrder, IOrder } from '../types';
import { Api } from './base/Api';
import { IProduct } from '../types';

export class LarekApi extends Api implements IShopApi {
	constructor(baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
	}

	getCatalog(): Promise<IProduct[]> {
		return this.get('/product').then((data: IProductResponse) => data.items);
	}
	getProductById(id: string): Promise<IProduct> {
		return this.get(`/product${id}`).then((item: IProduct) => item);
	}
	order(order: IOrder): Promise<ICompleteOrder> {
		return this.post(`/order`, order).then((data: ICompleteOrder) => data);
	}
}
