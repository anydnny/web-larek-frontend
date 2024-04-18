# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Паттерн
Для проектирования применены паттерны MVP (Model-View-Presenter)
## Описание моделей
### Интерфейс  `IApplication`
Содержит логику обработки данных приложения

- `setItemList` - установка списка товаров
- `addItemToCart` - добавление в корзину
- `removeItemFromCart` - удаление товара из корзины
- `setUserInfo` - установка значений покупателя
- `setPaymentInfo` - установка информации о способе оплаты
- `makePayment` - передача данных для оплаты
### Интерфейс `IItem`
Базовая модель товара
- `id: string`
- `title:string`
- `price:number`
### Интерфейс `IItemCard`
Модель товара для списка товаров расширяет `IItem`
- `category:string`
- `image:string`
### Интерфейс `IItemFullCard`
Модель товара для модального окна, расширяет `IItemCard`
- `description:string`
### Интерфейс `ICart`
Модель корзины
- `ItemList: IItem[]`
- `totalPrice: number`
### Интерфейс `IUserInfo`
Модель данных формы контактных данных
- `email:string`
- `phone:string`
### Интерфейс `IPaymentInfo`
Модель данных формы оплаты
- `address:string`
- `paymentMethod: "online" | "offline"`
### Интерфейс `IOrder`
Модель данных заказа, расширяет `IPaymentInfo, IUserInfo`
- `totalPrice:number`
- `items: string[]`
### Интерфейс `IOrderSuccess`
Модель успешного оформления
- `id:string`
- `totalPrice: number`
### Интерфейс `IPageView`
View главной страницы
- `ItemList: IItemCard[]`
- `cartCount: number`
### Интерфейс `IModalView`
View модального окна
`view: HTMLElement`
### Интерфейс `IFormView`
View формы
`valid: boolean`
### Класс `Api`
Класс позволяет делать запросы к API
- Метод `handleResponse` обрабатывает ответ от сервера
- Метод `get` делает GET-запрос
- Метод `post` делает POST-запрос
### Абстрактный класс `Component`
Нужен для создания компонента и установки стандартных методов для работы с текстом и css-классами
### Класс `EventEmitter`
Брокер событий для подписки на события
- `on` - подписывается на  событие;
- `off` - отписывается от события;
- `onAll` - подписывается на все события;
- `offAll` - отписывается от всех событий;
- `emit` - инициирует событие
