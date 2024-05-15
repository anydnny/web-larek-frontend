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
- src/scss/styles.scss — корневой файл стилей
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
## Базовые классы
### Класс `Api`
Класс c логикой для отправки запросов на сервер.
- `get(uri: string):<Promise<T>>` - метод для отправки GET запроса на указанный адрес. Возвращает промис с полученным объектом
- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - метод для отправки данных на сервер через POST запрос. Принимает адрес и объект с данными
### Абстрактный класс `Component`
Нужен для создания компонентов и содержит методы для работы с этими компонентами
- `toggleClass(element: HTMLElement, className: string, force?: boolean)` - метод для переключения класса элемента.  Принимает в параметрах нужынй элемент, наименование класса и опциональное значение для добавление или удаление класса
- `setText(element: HTMLElement, value: unknown)` - метод для утсановки текста. Принимает сам элемент и значенеи для установки
- `setDisabled(element: HTMLElement, state: boolean)` - метод для блокировки элемента. Принимает элемент и логическое значение для состояния
- `setHidden(element: HTMLElement)` - метод для скрытия элемента. Принимает сам элемент
- `setVisible(element: HTMLElement)` - метод для показа элемента. Принимает сам элемент
- `setImage(element: HTMLImageElement, src: string, alt?: string)` - метод для установки алтернатвного текста и изображения. Принимает элемент, ссылку и опционально значение для альтернативного текста
- `render(data?: Partial<T>): HTMLElement` - метод для вывода корневого компонента. Опционально принимает данные
### Класс `EventEmitter`
Брокер событий для обработки и генерации событий. Имплементирует интерфейс `IEvents`
- `on` - метод для подписки на событие
- `off` - метод для отписки от события
- `emit` - метод для инициализации события
- `trigger` - метод для создания коллбэк триггера, который при вызове сгенерирует событие
- `onAll` - метод подписки  на все события;
- `offAll` - метод отписки от всех событий;
### Абстрактный класс `Model`
Абстрактный класс для работы с данными.
- `emitChanges(event: string, payload?: object)` - метод для отправки событий с изменёнными данными
## Слой Model
### Интерфейс `IAppData`
Будет спользован для реализации класса `AppData`  в котором будет реализована логика обработки данных и их хранение. Будет содержать следующие свойства и методы:
Свойства
- `catalog: IProduct[],` - весь каталог продуктов
- `cart: ICart` - товары добавленные в корзину
- `selectedProduct: string | null` - выбранный для просмотра продукт
- `order: IOrder` - объект итого заказа
Методы
- `setCatalog(products: IProduct[]): void` - получение стартового каталога
- `setSelectedProduct(product: IProduct): void` - получение продукта для показа в модальном окне
- `setBaseOrder(): IOrder` - eстановка стандартного значения магазина
- `addToCart(product: IProduct): void` - метод добавления в корзину заказа
- `removeFromCart(product: IProduct): void` - метод удаления из заказа
- `checkItemInCart(product: IProduct): boolean` - проверка наличия товара в корзине (для отображения кнопок)
- `getTotalPrice(): number` - получение финальной суммы заказа
- `setPaymentInfo(data: IPaymentInfo): void` - установка значений формы оплаты в заказ
- `setUserInfo(data: IUserInfo): void` - установка значений формы клиентских данных в заказ
- `sendOrder(): void` - переход к оплате заказа
## Слой View
### Интерфейс `IProduct`
Интерфейс карточки продукта, который будет использован для создания класса `Product`, где будет содержаться информация о товаре. Содержит следующие свойства:
- `id: string` - айди продукта
- `description: strin` - описание продукта
- `category: string` - категория продукта
- `image: string` - ссылка на изображение продукта
- `price: number | null` - цена продукта
### Интерфейс `IProductResponse`
Будет использован для типизации ответа, получаемого при запросе к серверу. Свойства:
- `total: number` - общее число продуктов
- `items: IProduct[]` - массив продуктов
### Интерфейс `ICartProduct`
Интерфейс для типизации карточки товара в корзине продуктов. Свойства:
- `id: string` - айди продукта
- `title: string` - название товара
- `price: number` - цена товара
### Интерфейс `ICart`
Будет использова для типизации корзины. Свойства:
- `products: ICartProduct[]` - массив добавленных в корзину товаров
- `totalPrice: number | null` - итоговая цена в корзине
### Интерфейс `IShopApi`
Будет использова для реализации класса с запросами к серверу, который будет расширять текущий базовый класс `Api`
- `getCatalog(): Promise<IProduct[]>` - получение стартового каталога товаров
- `getProductById(id: string): Promise<IProduct>` - получение конкретного товара по айди
`- order(order: IOrder): Promise<ICompleteOrder>` - отправка сформированного заказа на сервер
### Интерфейс `IUserInfo`
Будет исползован для типизации формы с данными пользователя. Свойства:
- `email: string` - почта пользователя
- `phone: string` - телефон пользователя
### Интерфейс `IPaymentInfo`
Будет исползован для типизации формы с оплатой. Свойства:
- `method: "online" | "offline"` - метод оплаты
- `address: string` - адрес для заказа
### Интерфейс `IOrder`
Расширет интерфейсы `IUserInfo, IPaymentInfo` для итогового объекта заказа. Свойства:
`totalPrice: number` - финальная цена продуктов
`products: string[]` - массив id продуктов из коризны
### Интерфейс `ICompleteOrder`
Будет использова для типизации финального окна успешной оплаты. Свойства:
- `id: string` - айди заказа
- `totalPrice: number` - сумма заказа
### Интерфейс `IForm`
Будет использова для создания универсального класса формы. Свойства:
- `valid: boolean` - состояние валидации формы
### Интерфейс `IModal`
Будет использован для создание универсального класса модального окна с динамическим контентом. Свойства:
- `view: HTMLElement` - динамечский контент внутри окна
### Интерфейс `IShopPage`
Будет использован для создания класса начальной страницы магазина. Содержит следующие свойства:
- `catalog: IProduct[]` - массив всех продуктов на странице
- `cartCounter: number` - счётчик товаров в корзине
## Слой Presenter
В качестве презентера будет использован код в файле `src\index.ts`, где будет собрано и всё приложение из всех остальных файлов.
Содержит следующие события:
- `store:init` - инициализация магазина, получение списка товаров
- `product:click` - нажатие на карточку продукта, выбирает продукт
- `product:open` - открывает карточку выбранного продукта
- `modal:open` - открывает модальное окно
- `modal:close` - закрывает модальное окно
- `cart:render` - открывает корзину с товарами
- `cart:add` - добавляет выбранный товар в корзину
- `cart:remove` - удаляет товар из корзины
- `counter:update` - обновляет счетчик товаров в корзине
- `paymentForm:render` - открывает форму оплаты
- `paymentForm:change` - отслеживает изменения инпутов в форме оплаты
- `paymentForm:submit` - переходит от формы оплаты к форме персональнх данных
- `userForm:render` - открывает форму персональных данных
- `userForm:change` - отслеживает изменения инпутов в форме персональных данных
- `userForm:submit` - переходит к отправке данных на сервер
- `order:send` - отправляет данные заказа на сервер
- `order:success` - отображает окно успешной оплаты
