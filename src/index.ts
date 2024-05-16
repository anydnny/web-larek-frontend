import './scss/styles.scss';
import { LarekApi } from './components/LarekApi';
import { EventEmitter } from './components/base/Events';
import { Page } from './components/views/Page';
import { ensureElement, cloneTemplate, createElement } from './utils/utils';
import { Product } from './components/views/Product';
import { ICompleteOrder, IOrder, IProduct, IUserInfo } from './types';
import { AppData } from './components/AppData';
import { Modal } from './components/views/Modal';
import { Cart, ProductCart } from './components/views/Cart';
import { PaymentForm, UserForm } from './components/views/Form';

import { CompleteOrder } from './components/views/CompleteOrder';

import { IPaymentInfo } from './types';

const productStoreTemplate =
	ensureElement<HTMLTemplateElement>('#card-catalog');
const productOpenedTemplate =
	ensureElement<HTMLTemplateElement>('#card-preview');
const productCartTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const cartTemplate = ensureElement<HTMLTemplateElement>('#basket');
const userFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const paymentFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const completeOrderTemplate = ensureElement<HTMLTemplateElement>('#success');

const events = new EventEmitter();
const api = new LarekApi('https://larek-api.nomoreparties.co/api/weblarek');
const page = new Page(document.body, events);
const appData = new AppData(events);
const modal = new Modal(document.querySelector('#modal-container'), events);
const cart = new Cart(cloneTemplate(cartTemplate), events);
const userForm = new UserForm(cloneTemplate(userFormTemplate), events);
const paymentForm = new PaymentForm(cloneTemplate(paymentFormTemplate), events);

events.on('store:init', (store: IProduct[]) => {
	page.catalog = store.map((item) => {
		const card = new Product(cloneTemplate(productStoreTemplate), {
			onClick: () => {
				events.emit('product:click', item);
			},
		});
		return card.render({
			id: item.id,
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});
});

events.on('product:click', (item: IProduct) => {
	appData.setSelectedProduct(item);
});

events.on('product:open', (item: IProduct) => {
	const inCart = appData.checkItemInCart(item);
	if (item) {
		const card = new Product(cloneTemplate(productOpenedTemplate), {
			onClick: () => {
				if (inCart) {
					events.emit('cart:remove', item);
					modal.close();
				} else {
					events.emit('cart:add', item);
				}
			},
		});
		modal.render({
			view: card.render({
				id: item.id,
				title: item.title,
				image: item.image,
				price: item.price,
				category: item.category,
				description: item.description,
				inCart: inCart,
			}),
		});
	} else {
		modal.close();
	}
});

events.on('modal:open', () => {
	page.lockedWrapper = true;
});
events.on('modal:close', () => {
	page.lockedWrapper = false;
});

events.on('cart:render', () => {
	modal.render({
		view: createElement<HTMLElement>('div', {}, [
			cart.render({
				products: appData.order.products.map((item, index) => {
					const product = new ProductCart(cloneTemplate(productCartTemplate), {
						onClick: () => {
							events.emit('cart:remove', item);
							events.emit('cart:render');
						},
					});
					return product.render({
						id: item.id,
						index: index + 1,
						title: item.title,
						price: item.price,
					});
				}),
				totalPrice: appData.getTotalPrice(),
			}),
		]),
	});
});

events.on('cart:add', (product: IProduct) => {
	appData.addToCart(product);
	events.emit('counter:update');
	modal.close();
});
events.on('cart:remove', (product: IProduct) => {
	appData.removeFromCart(product);
	events.emit('counter:update');
});
events.on('counter:update', () => {
	page.cartCounter = appData.order.products.length;
});

events.on('paymentForm:render', () => {
	modal.render({
		view: paymentForm.render({
			valid: false,
			errors: [],
			address: '',
			method: '',
		}),
	});
});
events.on('paymentForm:change', () => {
	const data = paymentForm.checkFormValidity();
	paymentForm.valid = data.address && data.method;
	paymentForm.errors = Object.keys(data).filter(
		(item: keyof { address: boolean; method: boolean }) => !data[item]
	);
});

events.on('paymentForm:submit', (info: IPaymentInfo) => {
	appData.setPaymentInfo(info);
});

events.on(
	'paymentFormMethod:click',
	(data: { addClass: HTMLElement; removeClass: HTMLElement }) => {
		data.addClass.classList.add('button_alt-active');
		data.removeClass.classList.remove('button_alt-active');
	}
);
events.on('userForm:render', () => {
	modal.render({
		view: userForm.render({
			valid: false,
			errors: [],
			email: '',
			phone: '',
		}),
	});
});

events.on('userForm:change', () => {
	const data = userForm.checkFormValidity();
	userForm.valid = data.email && data.phone;
	userForm.errors = Object.keys(data).filter(
		(item: keyof { phone: boolean; email: boolean }) => !data[item]
	);
});
events.on('userForm:submit', (info: IUserInfo) => {
	appData.setUserInfo(info);
	appData.sendOrder();
});

events.on('order:send', (order: IOrder) => {
	api
		.order(order)
		.then((result) => events.emit('order:success', result))
		.catch((err) => console.error(err));
});

events.on('order:success', (data: ICompleteOrder) => {
	const completeOrder = new CompleteOrder(
		cloneTemplate(completeOrderTemplate),
		{
			onClick: () => {
				modal.close();
			},
		}
	);
	modal.render({
		view: completeOrder.render({
			total: data.total,
		}),
	});
	appData.order = appData.setBaseOrder();
	events.emit('counter:update');
});

api.getCatalog().then((catalog) => appData.setCatalog(catalog));
