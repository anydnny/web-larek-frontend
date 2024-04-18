// Модель обработки данных приложения
interface IApplication {
  // Методы с товарами
  setItemList(items: IItem[]): void, // установка списка товаров
  addItemToCart(item: IItem): void // добавление в корзину
  removeItemFromCart(item: IItem): void
  // Методы для работы с формой
  setUserInfo(userInfo: IUserInfo):void, // установка значений покупателя
  setPaymentInfo(paymentInfo: IPaymentInfo):void // установка информации о способе оплаты
  makePayment(order: IOrder): void // передача данных для оплаты
}
// Модель товара для корзины
interface IItem {
  id: string,
  title: string,
  price: number
}
// Модель товара для списка товаров
interface IItemCard extends IItem{
  category: string,
  image: string
}
// Модель товара для модального окна
interface IItemFullCard extends IItemCard {
  description: string
}
// Модель корзины
interface ICart {
  ItemList: IItem[],
  totalPrice: number
}
// Модель данных формы контактных данных
interface IUserInfo {
  email: string,
  phone: string
}
// Модель данных формы оплаты
interface IPaymentInfo {
  address: string,
  paymentMethod: "online" | "offline"
}
// Модель данных заказа
interface IOrder extends IPaymentInfo, IUserInfo{
  totalPrice: number,
  items: string[]
}
// Модель успешного оформления
interface IOrderSuccess {
  id: string,
  totalPrice: number
}
// View главной страницы
interface IPageView {
  ItemList: IItemCard[],
  cartCount: number
}
// View модального окна
interface IModalView{
  view: HTMLElement
}
// View формы
interface IFormView {
  valid: boolean
}

