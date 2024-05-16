export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const ITEM_CURRENCY = 'синапсов';
export const ITEM_NOCURRENCY = 'Бесценно';

export const ITEM_CATEGORY: Record<string, string> = {
	'софт-скил': 'soft',
	другое: 'other',
	дополнительное: 'additional',
	кнопка: 'button',
	'хард-скил': 'hard',
};

export const FORM_ERRORS: Record<string, string> = {
	address: 'Установите адрес',
	method: 'Выберите метод оплаты',
	phone: 'Укажите номер телефона',
	email: 'Укажите email',
};
