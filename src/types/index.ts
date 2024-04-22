// Интерфейс продукта
export interface IProduct {
  id: string,
  description: string,
  category: string,
  image: string,
  price: number | null
}
// Интерфейс ответа от сервера при получение каталога
export interface IProductResponse {
  total: number,
  items: IProduct[]
}
// Интерфейс продукта в корзине
export interface ICartProduct {
  id: string,
  title: string,
  price: number
}
// Интерфейс корзины
export interface ICart {
  products: ICartProduct[],
  totalPrice: number | null
}
// Интерфейс взаимодействия с сервером
export interface IShopApi {
  getCatalog(): Promise<IProduct[]>,
  getProductById(id: string): Promise<IProduct>,
  order(order: IOrder): Promise<ICompleteOrder>
}
// Интерфейс формы оплаты
export interface IPaymentInfo {
  method: "online" | "offline",
  address: string
}
// Интерфейс формы данных покупателя
export interface IUserInfo {
  email: string,
  phone: string
}
// Интерфейс целиковой информации о заказе
export interface IOrder extends IPaymentInfo, IUserInfo {
  totalPrice: number,
  products: string[]
}
// Интерфейс успешной оплаты
export interface ICompleteOrder {
	id: string,
	totalPrice: number,
}
// Интерфейс формы
export interface IForm {
  valid: boolean
}
// Интерфейс модального окна
export interface IModal {
  view: HTMLElement
}
// Интерфей страницы
export interface IShopPage {
  catalog: IProduct[],
  cartCounter: number,
}

export interface IAppData {
  catalog: IProduct[],
  cart: ICart,
  selectedProduct: string | null,
  order: IOrder,
  setCatalog(products: IProduct[]): void,
  setSelectedProduct(product: IProduct): void,
  addProductToCart(product: ICartProduct): void,
  removeProductFromCart(product: ICartProduct): void,
  setPaymentInfo(info: IPaymentInfo): void,
  setUserInfo(info: IUserInfo): void,
  makeOrder(): Promise<ICompleteOrder>,
  clearOrder(): void
}
