// Интерфейс продукта
export interface IProduct {
  id: string,
  title: string,
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
  price: number,
  index: number
}
// Интерфейс корзины
export interface ICart {
  products: HTMLElement[],
  totalPrice: number | null,
}
// Интерфейс взаимодействия с сервером
export interface IShopApi {
  getCatalog(): Promise<IProduct[]>,
  getProductById(id: string): Promise<IProduct>,
  order(order: IOrder): Promise<ICompleteOrder>
}
// Интерфейс формы оплаты
export interface IPaymentInfo {
  method: "online" | "offline" | "",
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
  products: IProduct[]
}
// Интерфейс успешной оплаты
export interface ICompleteOrder {
	id: string,
	total: number,
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
  selectedProduct: IProduct | null,
  order: IOrder,
  setCatalog(products: IProduct[]): void,
  setSelectedProduct(product: IProduct): void,
  setBaseOrder(): IOrder,
  addToCart(product: IProduct): void,
  removeFromCart(product: IProduct): void,
  checkItemInCart(product: IProduct): boolean,
  getTotalPrice(): number,
  setPaymentInfo(data: IPaymentInfo): void,
  setUserInfo(data: IUserInfo): void,
  sendOrder(): void
}
